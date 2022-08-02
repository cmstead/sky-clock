import { add } from 'date-fns';

import { getLocalTime } from "../../date-tools/regional-time"
import getMinutesToNextEvent from "../../date-tools/event-time-offset";
import { eventTimes } from "../../event-times/event-times";

import Time from "../time/Time";

export default function render({ eventKey, currentDate }) {
    const eventData = eventTimes[eventKey];
    const minutesToNextEvent = getMinutesToNextEvent(currentDate, eventData);

    const hoursOffset = Math.floor(minutesToNextEvent/60);
    const minutesOffset = minutesToNextEvent % 60;

    const nextEventDate = add(currentDate, { minutes: minutesToNextEvent });
    const {hour, minute} = getLocalTime(nextEventDate);

    return (
        <tr className="event">
            <td>{eventData.name}</td>
            <td><Time hour={hour} minute={minute}></Time></td>
            <td>{`${hoursOffset} hours, ${minutesOffset} minutes`}</td>
        </tr>
    );
}