import { Market, Outcome } from '$/app/(shared)/lib/line/types';

export type GameFormat =
    | 'unknown'
    | 'stream'
    | 'wotChaka'
    | 'wotSeven'
    | 'csTwo'
    | 'csFive'
    | 'vlrFive'
    | 'tennisOne'
    | 'tennisTwo'
    | 'dotaFive'
    | 'loLFive';

export type EventStatus = 'unknown' | 'draft' | 'wait' | 'live' | 'pause' | 'complete' | 'archive';

export type Game =
    | 'unknown'
    | 'worldOfTanks'
    | 'dota2'
    | 'leagueOfLegends'
    | 'kingOfGlory'
    | 'starcraft'
    | 'counterStrike'
    | 'valorant'
    | 'callOfDuty'
    | 'rainbowSix'
    | 'pubg'
    | 'hearthstone'
    | 'football'
    | 'tennis'
    | 'basketball'
    | 'iceHockey'
    | 'volleyball'
    | 'tableTennis'
    | 'handball'
    | 'beachVolleyball'
    | 'badminton'
    | 'mma'
    | 'americanFootball'
    | 'futsal'
    | 'baseball'
    | 'ufc'
    | 'boxing'
    | 'australianRulesFootball'
    | 'athletics'
    | 'bandy'
    | 'beachFootball'
    | 'biathlon'
    | 'snooker'
    | 'bowls'
    | 'chess'
    | 'cricket'
    | 'curling'
    | 'darts'
    | 'fieldHockey'
    | 'floorball'
    | 'golf'
    | 'lottery'
    | 'motorSport'
    | 'olympics'
    | 'politics'
    | 'rugby'
    | 'squash'
    | 'waterPolo'
    | 'kabaddi'
    | 'cyberSport'
    | 'cyberFootball'
    | 'cyberHockey'
    | 'cyberTennis'
    | 'cyberTableTennis'
    | 'cyberBasketball'
    | 'cyberVolleyball'
    | 'cyberCricket'
    | 'cyberKabaddi'
    | 'virtualFootball'
    | 'virtualHockey'
    | 'virtualTennis'
    | 'virtualTableTennis'
    | 'virtualBasketball'
    | 'virtualVolleyball'
    | 'virtualCricket'
    | 'virtualKabaddi';

export type PlatformName =
    | 'Unknown'
    | 'Youtube'
    | 'Twitch'
    | 'Trovo'
    | 'Trovo'
    | 'VKPlay'
    | 'Telegram';

export type GameType = {
    game: Game;
    gameId: number;
    gameName: string;
    priority: number;
    shortName?: string;
};

export type TeamInfo = {
    description: string | null;
    id: number;
    imageUrl: string;
    name: string;
};

export type MapType = 'map';

export type ScoreboardPeriod = {
    index: number;
    isActive: boolean;
    teamOneScore: number;
    teamTwoScore: number;
    type: MapType;
};

export type EventChannel = {
    description: string | null;
    id: number;
    imageUrl: string;
    markets: Market[];
    name: string;
    platform: number;
    platformName: PlatformName;
    url: string;
};

export type Scoreboard = {
    periodScores: ScoreboardPeriod[];
    teamOneScore: number;
    teamTwoScore: number;
};

export type Stream = {
    channels: EventChannel[];
    dateStart: string;
    dateStartStr: string;
    game: Game;
    gameFormat: number;
    gameFormatName: GameFormat;
    id: number;
    isFavorite: boolean;
    scoreboard: Scoreboard;
    status: EventStatus;
    teamOne: TeamInfo;
    teamTwo: TeamInfo;
    tournamentId: number;
    tournamentName: string;
    tournamentTier: number;
};

export type BetInfoFromId = {
    betSumm: number;
    currencyCode: string;
    currencyId: number;
    currencyImageUrl: string;
    marketName: string;
    outcome: Omit<Outcome, 'isPoint'>;
    sendScore: Scoreboard & {
        activeOneIndex: number;
        activeTwoIndex: number;
        streamId: number;
    };
    stream: {
        dateStart: string;
        game: Game;
        gameFormat: GameFormat;
        id: number;
        imageUrl: string;
        status: EventStatus;
    };
    teamOne: TeamInfo;
    teamTwo: TeamInfo;
    tournament: {
        game: Game;
        id: number;
        name: string;
        tier: number;
    };
};
