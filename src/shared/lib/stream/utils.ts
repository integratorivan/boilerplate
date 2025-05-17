import { getDateParams } from '../utils/date';

export const getBadgeDateText = (date: string, text?: string | null) => {
    const { hours, minutes } = getDateParams(date);
    return `${text ?? ''}${hours}:${minutes}`;
};
