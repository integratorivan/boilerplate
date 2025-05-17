export const generateEventUrl = (
    eventId: string,
    enterType?: string,
    customUrlParams?: Record<string, unknown> | null,
) => {
    if (!eventId) {
        return '/';
    }

    const url = new URL('/event', window.location.origin);

    url.searchParams.set('eventId', eventId);

    if (enterType) {
        url.searchParams.set('enterType', enterType);
    }
    url.searchParams.set('eventTypeId', eventId);

    if (customUrlParams) {
        Object.entries(customUrlParams).forEach(([key, value]) => {
            url.searchParams.set(key, String(value));
        });
    }
    const { pathname } = url;
    const searchParams = url.search ? `${url.search}` : '';
    const hash = url.hash ? `#${url.hash}` : '';

    return `${pathname}${searchParams}${hash}`;
};
