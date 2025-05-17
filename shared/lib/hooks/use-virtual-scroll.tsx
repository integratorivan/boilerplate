import type { RefObject } from 'react';
import { useCallback } from 'react';

export const useVirtualScrollScroll = (
    loadMore: () => void,
    observer: RefObject<IntersectionObserver | null>,
    params: { isCanLoad: boolean; isLoading: boolean; isValidating: boolean },
    observerOptions: IntersectionObserverInit = {},
) => {
    const { isLoading, isValidating, isCanLoad } = params;

    const lastDataRendered = useCallback(
        (node: HTMLDivElement) => {
            if (isLoading || isValidating || !isCanLoad) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            }, observerOptions);
            if (node) observer.current.observe(node);
        },
        [isCanLoad, isLoading, isValidating, loadMore, observer, observerOptions],
    );

    return {
        lastDataRendered,
    };
};
