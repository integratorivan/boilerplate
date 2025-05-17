import ky from 'ky';

import { getCookie, getTokenFromCookie } from '$shared/lib/utils/cookie';

const createApiInstance = () => {
    const apiUrl = typeof window === 'undefined' ? process.env.NEXT_PUBLIC_API_URL : '/api';

    return ky.create({
        hooks: {
            beforeRequest: [
                (request) => {
                    let token = typeof document !== 'undefined' ? getCookie('accessToken') : null;

                    if (token) {
                        token = getTokenFromCookie(token);
                        request.headers.set('Authorization', `Bearer ${token}`);
                    }
                },
            ],
        },
        prefixUrl: apiUrl,
    });
};

// transport
export const api = createApiInstance();
