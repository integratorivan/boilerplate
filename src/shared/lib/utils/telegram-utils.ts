// Все взято из самой телеги
export function urlSafeDecode(urlencoded: string) {
    try {
        const encoded = urlencoded.replace(/\+/g, '%20');
        return decodeURIComponent(encoded);
    } catch {
        return urlencoded;
    }
}

export function urlParseQueryString(initQueryString: string) {
    const params: Record<string, unknown> = {};
    let queryString = initQueryString;
    if (!queryString) {
        queryString = '';
    }

    if (!queryString.length) {
        return params;
    }
    const queryStringParams = queryString.split('&');
    let i;
    let param;
    let paramName;
    let paramValue;
    for (i = 0; i < queryStringParams.length; i++) {
        param = queryStringParams[i].split('=');
        paramName = urlSafeDecode(param[0]);
        paramValue = param[1] == null ? null : urlSafeDecode(param[1]);
        params[paramName] = paramValue;
    }
    return params;
}

export function urlParseHashParams(initLocationHash: string) {
    let locationHash = initLocationHash.replace(/^#/, '');
    const params: Record<string, unknown> = {};
    if (!locationHash.length) {
        return params;
    }
    if (locationHash.indexOf('=') < 0 && locationHash.indexOf('?') < 0) {
        params._path = urlSafeDecode(locationHash);
        return params;
    }
    const qIndex = locationHash.indexOf('?');
    if (qIndex >= 0) {
        const pathParam = locationHash.substr(0, qIndex);
        params._path = urlSafeDecode(pathParam);
        locationHash = locationHash.substr(qIndex + 1);
    }
    const queryParams: Record<string, unknown> = urlParseQueryString(locationHash);

    Object.assign(params, queryParams);

    return params;
}
