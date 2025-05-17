import { useRef, useState } from 'react';
import { useIsomorphicEffect } from '@reatom/npm-react';

import { MIN_DESKTOP_WIDTH, MIN_TABLET_WIDTH } from './constants';
import type { Platform } from './types';

export const usePlatform = () => {
    const [platform, setPlatform] = useState<Platform>(() => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth <= MIN_TABLET_WIDTH) {
                return 'mobile';
            }
            if (window.innerWidth <= MIN_DESKTOP_WIDTH) {
                return 'tablet';
            }
        }

        return 'desktop';
    });
    const $deviceWidth = useRef(0);

    useIsomorphicEffect(() => {
        $deviceWidth.current = window.innerWidth;

        const handleResize = () => {
            $deviceWidth.current = window.innerWidth;

            if ($deviceWidth.current <= MIN_TABLET_WIDTH) {
                setPlatform('mobile');
            } else if ($deviceWidth.current <= MIN_DESKTOP_WIDTH) {
                setPlatform('tablet');
            } else {
                setPlatform('desktop');
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return {
        deviceWidth: $deviceWidth.current,
        isDesktop: platform === 'desktop',
        platform,
    };
};
