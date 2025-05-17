export const getCookie = (name: string): string | undefined => {
    if (typeof document === 'undefined') {
        return undefined;
    }

    const matches = document.cookie.match(
        new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`),
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (
    name: string,
    value: string,
    options: { expires?: Date | string } & Record<string, unknown> = {},
): void => {
    if (typeof document === 'undefined') {
        return;
    }

    const updatedOptions: { path: string; expires?: string | Date } & Record<string, unknown> = {
        path: '/',
        ...options,
    };

    if (updatedOptions.expires instanceof Date) {
        updatedOptions.expires = updatedOptions.expires.toUTCString();
    }

    let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    Object.entries(updatedOptions).forEach(([optionKey, optionValue]) => {
        updatedCookie += `; ${optionKey}`;
        if (optionValue !== true) {
            updatedCookie += `=${optionValue}`;
        }
    });

    document.cookie = updatedCookie;
};

export const removeCookie = (name: string) => {
    setCookie(name, '', { expires: new Date(0) });
};

export const getLocaleFromAcceptLanguage = (acceptLangauge: string | null) => {
    if (!acceptLangauge) {
        return 'ru';
    }

    const languages = acceptLangauge.split(',');
    return languages[0].split('-')[0];
};

export const getTokenFromCookie = (cookieValue?: string) => {
    if (!cookieValue) {
        return null;
    }
    try {
        return JSON.parse(cookieValue).data;
    } catch (err) {
        return cookieValue || null;
    }
};

export const getTokenExpireMs = () => {
    const existedExpire = getCookie('expires');

    if (!existedExpire) {
        return null;
    }

    const currentMs = new Date().getTime();
    const tokenMs = new Date(existedExpire as string).getTime();

    return tokenMs - currentMs;
};
