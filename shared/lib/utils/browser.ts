export const getBrowserName = (userAgent: string) => {
    if (userAgent.includes('Firefox')) {
        return 'Firefox';
    }
    if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
        return 'Chrome';
    }
    if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
        return 'Safari';
    }
    if (userAgent.includes('Edg')) {
        return 'Edge';
    }
    if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
        return 'Opera';
    }
    return 'Unknown';
};

export const getOS = (userAgent: string) => {
    if (userAgent.includes('Win')) {
        return 'Windows';
    }
    if (userAgent.includes('Mac')) {
        return 'MacOS';
    }
    if (userAgent.includes('Linux')) {
        return 'Linux';
    }
    if (userAgent.includes('Android')) {
        return 'Android';
    }
    if (userAgent.includes('like Mac')) {
        return 'iOS';
    }
    return 'Unknown';
};
