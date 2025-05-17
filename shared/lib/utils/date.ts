export const checkIsTodayDate = (date: string) => {
    const today = new Date();
    const eventDate = new Date(date);
    return (
        eventDate.getDate() === today.getDate() &&
        eventDate.getMonth() === today.getMonth() &&
        eventDate.getFullYear() === today.getFullYear()
    );
};

export const getDateParams = (date?: string) => {
    if (!date) {
        return {};
    }

    const eventDate = new Date(date);
    const year = eventDate.getFullYear();
    let hours: number | string = eventDate.getHours();
    let minutes: number | string = eventDate.getMinutes();
    const month = eventDate.getMonth();
    const day = eventDate.getDate();

    if (hours < 10) {
        hours = `0${hours}`;
    }

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return {
        day,
        hours,
        minutes,
        month,
        year,
    };
};

/**
 * Проверяет, равна ли текущая дата дате, переданной в качестве параметра.
 *
 * @param {string} dateToCheck - Дата для проверки в формате 'YYYY-MM-DD'
 * @return {boolean} - True если даты равны, иначе False
 */
export const isToday = (dateToCheck: string) => {
    // Получаем текущую дату
    const today = new Date();

    // Преобразуем переданную дату в объект Date
    const checkDate = new Date(dateToCheck);

    // Сравниваем только год, месяц и день
    return (
        today.getFullYear() === checkDate.getFullYear() &&
        today.getMonth() === checkDate.getMonth() &&
        today.getDate() === checkDate.getDate()
    );
};

export const checkIsTomorrow = (dateToCheck: string) => {
    // Получаем завтрашнюю дату
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Преобразуем переданную дату в объект Date
    const checkDate = new Date(dateToCheck);

    // Сравниваем год, месяц и день с завтрашней датой
    return (
        tomorrow.getFullYear() === checkDate.getFullYear() &&
        tomorrow.getMonth() === checkDate.getMonth() &&
        tomorrow.getDate() === checkDate.getDate()
    );
};
