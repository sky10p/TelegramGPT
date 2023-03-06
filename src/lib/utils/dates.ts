
export const createDateWithoutTime = (date: Date): Date => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return new Date(Date.UTC(year, month, day))
}

export const getFirstDayOfMonth = (date: Date): Date => {
    const utcDate = createDateWithoutTime(date)
    const year = utcDate.getUTCFullYear();
    const month = utcDate.getUTCMonth();

    const firstDay = new Date(Date.UTC(year, month, 1));
    return firstDay;
}

export const getDateString = (date: Date): string => {
    return date.toISOString().split('T')[0]
}

export const getFirstDayOfCurrentMonth = (): Date => {
    const utcDate = createDateWithoutTime(new Date());
    return getFirstDayOfMonth(utcDate);
}

export const getDayOfCurrentMonth = (): Date => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const utcDate = createDateWithoutTime(tomorrow);
    return utcDate;
}