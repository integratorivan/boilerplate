export type GroupMarket = {
    id: string;
    markets: Market[];
    name: string;
};

export type Team = 'two' | 'one' | 'draw';

export type SideSpecifierValue = 'right' | 'left' | 'middle';

export type OutcomeMetaInfo = {
    pointName?: string | number;
    score?: SideSpecifierValue;
    side?: SideSpecifierValue;
    team?: Team;
    teamPoint?: Team;
    weight?: number;
};

export type OutcomeMarketInfo = {
    id: number;
    kind: MarketKind;
    name: string;
    point: number | null;
};

export type OutcomeEventInfo = {
    id: number;
    index?: number;
    title?: string | null;
};

export type Outcome = {
    id: number;
    isActive: boolean;
    name: string | null;
    odds: number;
    specifiers: OutcomeMetaInfo | null;
    isPoint?: boolean;
};

export type MarketKind = 'match' | 'handicap' | 'total' | 'unknown' | 'micro' | 'map' | 'default';
export type MarketType = 'standart' | 'micro';

export type MarketOutcomeNames = 'team' | 'none' | 'default' | 'point';
export type LineCategories = 'leftOutcomes' | 'rightOutcomes' | 'middleOutcomes' | 'otherOutcomes';

export type MarketEventType = 'match' | 'map' | 'set' | 'round' | 'battle' | 'period' | 'game';

export type MarketMetaInfo = {
    isShowMicro: boolean;
    isShowPoint: boolean;
    isShowTitle: boolean;
    kind: MarketKind;
    outcomeName: MarketOutcomeNames;
    weight: number;
};

export type MarketSpecifiers = {
    map: string;
    sport_side: 'counter_terrorist' | 'terrorist';
    team: 'two' | 'one';
    threshold: string;
    variant: string;
    way: string;
};

export type MarketEvent = {
    id: number;
    index: number;
    streamId: number;
    type: MarketEventType;
};

export type Market = {
    groupId: string;
    id: number;
    isActive: boolean;
    name: string;
    outcomes: Outcome[];
    point: number | null;
    sendEvent: MarketEvent;
    settings: MarketMetaInfo;
    specifiers: MarketSpecifiers;
    streamId: number;
};

export type TournamentTier =
    | 'one'
    | 'two'
    | 'three'
    | 'four'
    | 'five'
    | 'six'
    | 'seven'
    | 'eight'
    | 'nine'
    | 'ten';
