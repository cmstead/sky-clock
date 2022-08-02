import { add, format } from "date-fns";

import "./WeeklyReset.css";

import getMinutesToNextEvent from "../../date-tools/event-time-offset";
import { getFormattedSkyTime, getLocalTime } from "../../date-tools/regional-time";
import { weeklyReset } from "../../event-times/event-times";

export default function render({ currentDate }) {
    const currentDay = parseInt(getFormattedSkyTime(currentDate, 'i'));

    const eventData = weeklyReset;
    const minutesToMidnight = getMinutesToNextEvent(currentDate, eventData);
    const daysUntilReset = minutesToMidnight === 0 ? 6 - currentDay : 5 - currentDay;

    const hoursOffset = Math.floor(minutesToMidnight / 60);
    const minutesOffset = minutesToMidnight % 60;

    const nextEventDate = add(currentDate, { days: daysUntilReset, minutes: minutesToMidnight });
    const { hour, minute } = getLocalTime(nextEventDate);
    const day = format(nextEventDate, 'EEEE');

    return (
        <div id="weekly-reset">{`Next weekly reset on ${format(nextEventDate, 'EEEE')} at ${format(nextEventDate, 'HH:mm')}`}</div>
    );

}