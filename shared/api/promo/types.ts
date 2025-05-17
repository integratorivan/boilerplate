export type PromoContentType = 'promotion' | 'banner';

export type PromoContent = {
    dateTimeEnd: string;
    dateTimeStart: string;
    description: string;
    firstDarkColor: string | null;
    firstLightColor: string | null;
    id: number;
    imageDarkUrl: string;
    imageLightUrl: string;
    lastDarkColor: string | null;
    lastLightColor: string | null;
    promoType: PromoContentType;
    title: string;
    url: string;
};
