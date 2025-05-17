import { api } from '../instance';
import type { PromoContent } from './types';

export const getBanners = () => {
    return api<PromoContent[]>('promo/banner').json();
};

export const getPromotions = () => api<PromoContent[]>('promo/promotion').json();
