class DateUtil {
    addMinutes(minutes) {
        const currentDate = new Date();
        const unixDate = currentDate.setMinutes(
            currentDate.getMinutes() + minutes
        );

        return new Date(unixDate);
    }
    addHours(hours, date) {
        const startDate = date || new Date();
        const unixDate = startDate.setHours(startDate.getHours() + hours);

        return new Date(unixDate);
    }
}

export const date = new DateUtil();
