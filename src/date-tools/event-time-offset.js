import { add } from 'date-fns';

import { getLocalTime, getSkyTime } from "./regional-time"

export function getMinutesToNextEvent(currentDate, eventData) {
    const { hour, minute } = getSkyTime(currentDate);

    const hourOffset = eventData.hour(hour);
    const minuteOffset = eventData.minute(minute);

    if(eventData.period === 24 * 60 ) {
        return (hourOffset * 60) + minuteOffset;
    } else if(hourOffset > 0) {
        return eventData.period - ((hourOffset * 60) - minuteOffset);
    } else if(minuteOffset > 0) {
        return minuteOffset;
    } else {
        return eventData.period - Math.abs(minuteOffset);
    }
}

export function getEventOffset(eventData, currentDate) {
    const minutesToNextEvent = getMinutesToNextEvent(currentDate, eventData);
    
    const hoursOffset = Math.floor(minutesToNextEvent / 60);
    const minutesOffset = minutesToNextEvent % 60;
    
    const nextEventDate = add(currentDate, { minutes: minutesToNextEvent });
    const { hour, minute } = getLocalTime(nextEventDate);
    
    return {
        date: nextEventDate,
        minutesToNextEvent,
        hoursOffset,
        minutesOffset,
        hour,
        minute
    };
}