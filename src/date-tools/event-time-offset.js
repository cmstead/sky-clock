import { add } from 'date-fns';

import { getLocalTime, getSkyTime } from "./regional-time"

export function getMinutesToNextEvent(eventData, currentDate) {
    const { day, hour, minute } = getSkyTime(currentDate);

    const dayOffset = eventData.days ? eventData.days(day) : 0;
    const hourOffset = eventData.hour(hour);
    const minuteOffset = eventData.minute(minute);

    if (eventData.period > 24 * 60) {
        return (dayOffset * 24 * 60) + (hourOffset * 60) + minuteOffset;
    } else if (eventData.period === 24 * 60) {
        return (hourOffset * 60) + minuteOffset;
    } else if (hourOffset > 0) {
        return eventData.period - ((hourOffset * 60) - minuteOffset);
    } else if (minuteOffset > 0) {
        return minuteOffset;
    } else {
        return eventData.period - Math.abs(minuteOffset);
    }
}

export function getEventOffset(eventData, currentDate) {
    const minutesToNextEvent = getMinutesToNextEvent(eventData, currentDate);

    const daysOffset = Math.floor(minutesToNextEvent / (24 * 60));
    const hoursOffset = Math.floor(minutesToNextEvent / 60);
    const minutesOffset = minutesToNextEvent % 60;

    const nextEventDate = add(currentDate, { minutes: minutesToNextEvent });
    const { day, hour, minute } = getLocalTime(nextEventDate);

    return {
        date: nextEventDate,
        minutesToNextEvent,
        daysOffset,
        hoursOffset,
        minutesOffset,
        day,
        hour,
        minute
    };
}