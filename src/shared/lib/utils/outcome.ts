import type { LineCategories, Market, MarketOutcomeNames, Outcome } from '$shared/types/line';

import { MARKET_EVENT_NAMES } from '../constants/line';

/**
 * Генерация текста для исхода
 */
export const getOutcomeTitle = (
    specifiers: Outcome['specifiers'],
    outcomeTitle: string,
    nameType: MarketOutcomeNames,
): string => {
    if (!specifiers) return outcomeTitle;

    switch (nameType) {
        case 'point':
            return specifiers?.pointName ? String(specifiers.pointName) : '';
        default:
            return outcomeTitle;
    }
};

/**
 * Формируем окончательный массив исходов
 */
const mergeOutcomes = (
    teamOneOutcomes: Outcome[],
    teamTwoOutcomes: Outcome[],
    drawOutcomes: Outcome[],
    otherOutcomes: Outcome[],
    insertDrawInMiddle: boolean,
): Outcome[] => {
    const finalSortedOutcomes: Outcome[] = [];
    const maxLength = Math.max(teamOneOutcomes.length, teamTwoOutcomes.length);

    for (let i = 0; i < maxLength; i++) {
        if (i < teamOneOutcomes.length) finalSortedOutcomes.push(teamOneOutcomes[i]);
        if (i < teamTwoOutcomes.length) finalSortedOutcomes.push(teamTwoOutcomes[i]);
    }

    // при необходимости вставляем исход "ничья" между двумя другими
    if (insertDrawInMiddle) {
        const middleIndex = Math.floor(finalSortedOutcomes.length / 2);
        drawOutcomes.forEach((drawOutcome) => {
            finalSortedOutcomes.splice(middleIndex, 0, drawOutcome);
        });
    } else {
        finalSortedOutcomes.push(...drawOutcomes);
    }

    finalSortedOutcomes.push(...otherOutcomes);

    return finalSortedOutcomes;
};

/**
 * Вставляем "поинты" между исходами
 */
export const insertPontOutcome = (outcomes: Outcome[], pointValue: number) => {
    const point: Outcome = {
        id: new Date().getMilliseconds() + pointValue,
        isActive: true,
        isPoint: true,
        name: '',
        odds: pointValue,
        specifiers: null,
    };

    const result: Outcome[] = [];

    for (let i = 0; i < outcomes.length; i++) {
        result.push(outcomes[i]);
        result.push(point);

        if (i + 1 < outcomes.length) {
            i++;
            result.push(outcomes[i]);
        }
    }

    return result;
};

/**
 * Получаем значения из метаинфы исхода для сортировки в рамках маркета
 */
const getWeightValue = (specifiers: Outcome['specifiers']) => {
    return specifiers?.weight || null;
};

/**
 * Получаем значения из метаинфы исхода для позиционирования
 */
const getTeamValue = (specifiers: Outcome['specifiers'], teamOrder: Record<string, number>) => {
    if (!specifiers) {
        return null;
    }

    return specifiers.team ? teamOrder[specifiers.team as string] : null;
};

/**
 * Разбиваем маркеты на стороны для позиционирования
 */
const categorizeOutcomes = (sortedOutcomes: Outcome[]) => {
    const categories: Record<LineCategories, Outcome[]> = {
        leftOutcomes: [],
        middleOutcomes: [],
        otherOutcomes: [],
        rightOutcomes: [],
    };

    sortedOutcomes.forEach((outcome) => {
        const sidePoint = outcome.specifiers?.side;
        const scorePoint = outcome.specifiers?.score;

        if (scorePoint) {
            switch (scorePoint) {
                case 'left':
                    categories.leftOutcomes.push(outcome);
                    break;
                case 'right':
                    categories.rightOutcomes.push(outcome);
                    break;
                case 'middle':
                    categories.middleOutcomes.push(outcome);
                    break;
                default:
                    categories.otherOutcomes.push(outcome);
                    break;
            }

            return categories;
        }

        if (!sidePoint) {
            categories.otherOutcomes.push(outcome);
            return;
        }

        switch (sidePoint) {
            case 'left':
                categories.leftOutcomes.push(outcome);
                break;
            case 'right':
                categories.rightOutcomes.push(outcome);
                break;
            case 'middle':
                categories.middleOutcomes.push(outcome);
                break;
            default:
                categories.otherOutcomes.push(outcome);
                break;
        }
    });

    return categories;
};

/**
 * Сортировка исходов по данным из specifiers
 */
export const sortOutcomesByMetaInfo = (outcomes: Outcome[]) => {
    // определяем приоритеты для исходов
    const teamOrder =
        outcomes.length <= 3 ? { draw: 1, one: 0, two: 2 } : { draw: 2, one: 0, two: 1 };

    // сортируем по weight и team
    const sortedOutcomes = outcomes.sort((a, b) => {
        const aWeightValue = getWeightValue(a.specifiers);
        const bWeightValue = getWeightValue(b.specifiers);

        if (aWeightValue !== null && bWeightValue !== null) {
            if (aWeightValue === bWeightValue) {
                const aTeamValue = getTeamValue(a.specifiers, teamOrder);
                const bTeamValue = getTeamValue(b.specifiers, teamOrder);

                return Number(aTeamValue) - Number(bTeamValue);
            }
            return Number(aWeightValue) - Number(bWeightValue);
        }

        if (aWeightValue !== null) return -1;
        if (bWeightValue !== null) return 1;

        const aTeamValue = getTeamValue(a.specifiers, teamOrder);
        const bTeamValue = getTeamValue(b.specifiers, teamOrder);

        if (aTeamValue !== null && bTeamValue !== null) {
            return aTeamValue - bTeamValue;
        }

        return 0;
    });

    const { leftOutcomes, rightOutcomes, middleOutcomes, otherOutcomes } =
        categorizeOutcomes(sortedOutcomes);

    return {
        outcomes: mergeOutcomes(
            leftOutcomes,
            rightOutcomes,
            middleOutcomes,
            otherOutcomes,
            outcomes.length <= 3,
        ),
    };
};

/**
 * Разбиение исходов на строчки
 */
export const splitOutcomesIntoRows = (outcomes: Outcome[], itemsPerRow = 3) => {
    const rows = [];
    for (let i = 0; i < outcomes.length; i += itemsPerRow) {
        rows.push(outcomes.slice(i, i + itemsPerRow));
    }
    return rows;
};

/**
 * Когда у нас есть поинт и ровно 3 исхода: ставим поинт слева и справа в линию ставим все 3 исхода
 */
const insertLeadingPointToLineOfOutcomes = (outcomes: Outcome[], pointValue: number) => {
    const point: Outcome = {
        id: new Date().getMilliseconds() + pointValue,
        isActive: true,
        isPoint: true,
        name: '',
        odds: pointValue,
        specifiers: null,
    };
    outcomes.unshift(point);

    return outcomes;
};

/**
 * Для выбора действия как нужно модифицировать исходы: добавить поинт в начало/середину или ничего не делать
 */
const getOutcomesBuildingOutcomes = (
    outcomes: Outcome[],
    pointInfo: {
        isShowPoint: boolean;
        point: number;
    },
) => {
    if (!pointInfo.isShowPoint) {
        return outcomes;
    }

    if (outcomes.length === 3) {
        return insertLeadingPointToLineOfOutcomes(outcomes, pointInfo.point);
    }

    return insertPontOutcome(outcomes, pointInfo.point);
};

/**
 * Определение кол-ва исходов в линию
 */
const getItemsPerRow = ({
    outcomesLength,
    isShowPoint,
    isSmallMarket,
    isScoreOutcomes,
}: {
    isScoreOutcomes: boolean;
    isShowPoint: boolean;
    isSmallMarket: boolean;
    outcomesLength: number;
}) => {
    if (isShowPoint && outcomesLength === 3) {
        return 4;
    }

    if (isShowPoint || isSmallMarket || isScoreOutcomes) {
        return 3;
    }

    return 2;
};

export const getFullOutcomeInfo = (market: Market, isSmallMarket: boolean) => {
    const { isShowPoint } = market.settings;

    const isScoreOutcomes = Boolean(market.outcomes[0].specifiers?.score);
    const sortedOutcomes = sortOutcomesByMetaInfo(market.outcomes);
    const marketPoint = isShowPoint ? market.point : null;

    const outcomes = getOutcomesBuildingOutcomes(sortedOutcomes.outcomes, {
        isShowPoint,
        point: marketPoint || 0,
    });

    const itemsPerRow = getItemsPerRow({
        isScoreOutcomes,
        isShowPoint,
        isSmallMarket,
        outcomesLength: market.outcomes.length,
    });

    const outcomeRows = splitOutcomesIntoRows(outcomes, itemsPerRow);
    const outcomeTypeName = market.settings.outcomeName.toLowerCase() as MarketOutcomeNames;

    const { type: eventType, id: eventId } = market.sendEvent;

    const isCorrectEventType = eventType === 'match' || eventType === 'map';
    const marketEventTitle = MARKET_EVENT_NAMES[eventType as keyof typeof MARKET_EVENT_NAMES];

    const outcomeEventInfo = {
        id: eventId,
        index: market.sendEvent.index,
        title: isCorrectEventType ? marketEventTitle : null,
    };

    return {
        outcomeEventInfo,
        outcomeRows,
        outcomeTypeName,
    };
};
