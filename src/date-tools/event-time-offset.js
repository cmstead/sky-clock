import { getSkyTime } from "./regional-time"

export default function getMinutesToNextEvent(currentDate, eventData) {
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