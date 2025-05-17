import type { MarketEventType, MarketSpecifiers } from '$/app/(shared)/lib/line/types';

export const MARKET_EVENT_NAMES: Record<MarketEventType, string> = {
    battle: 'TK_LINE_EVENT-TYPE_BATTLE',
    game: 'TK_LINE_EVENT-TYPE_GAME',
    map: 'TK_LINE_EVENT-TYPE_MAP',
    match: 'TK_LINE_EVENT-TYPE_MATCH',
    period: 'TK_LINE_EVENT-TYPE_PERIOD',
    round: 'TK_LINE_EVENT-TYPE_ROUND',
    set: 'TK_LINE_EVENT-TYPE_SET',
};

export const TEAM_NAME_KEY_BY_SETTING = {
    one: 'teamOne',
    two: 'teamTwo',
};

export const SPORT_SIDE_BY_KEY: Record<MarketSpecifiers['sport_side'], string> = {
    counter_terrorist: 'Спецназ',
    terrorist: 'Террористы',
};

export const TIERS_BY_NUMBER = {
    0: 'zero',
    1: 'one',
    10: 'ten',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
};

export const TIERS_BY_NUMBER_REVERSE = Object.entries(TIERS_BY_NUMBER).reduce(
    (acc, [key, value]) => {
        acc[value] = key;
        return acc;
    },
    {} as Record<string, string>,
);
