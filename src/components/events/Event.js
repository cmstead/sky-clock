import { add } from 'date-fns';

import { getLocalTime, getSkyTime } from "../../date-tools/regional-time"
import { eventTimes } from "../../event-times/event-times";

import Time from "../time/Time";

function getMinutesToNextEvent(currentDate, eventData) {
    const { hour, minute } = getSkyTime(currentDate);

    const hourOffset = eventData.hour(hour);
    const minuteOffset = eventData.minute(minute);

    if(hourOffset > 0) {
        return eventData.period - ((hourOffset * 60) - minuteOffset);
    } else if(minuteOffset > 0) {
        return minuteOffset;
    } else {
        return eventData.period - Math.abs(minuteOffset);
    }
}

export default function render({ eventKey, currentDate }) {
    const eventData = eventTimes[eventKey];
    const minutesToNextEvent = getMinutesToNextEvent(currentDate, eventData);

    const nextEventDate = add(currentDate, { minutes: minutesToNextEvent });
    const {hour, minute} = getLocalTime(nextEventDate);

    return (
        <div className="event">
            <div>{eventData.name}</div>
            <div><Time hour={hour} minute={minute}></Time></div>
        </div>
    );
}