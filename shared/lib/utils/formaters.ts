export const LOCALES = {
    en: 'en-US',
    ru: 'ru-Ru',
};

export const formatNumber = (value: number, initialLocale: string) => {
    const locale = LOCALES[initialLocale as keyof typeof LOCALES] || 'ru-Ru';

    return new Intl.NumberFormat(locale).format(value);
};

export const formatNumberWithDecimals = (value: number, initialLocale: string) => {
    const locale = LOCALES[initialLocale as keyof typeof LOCALES] || 'ru-Ru';

    return new Intl.NumberFormat(locale, {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
    }).format(value);
};

export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
