import { add, format } from "date-fns";

import "./WeeklyReset.css";

import { getMinutesToNextEvent } from "../../date-tools/event-time-offset";
import { getFormattedSkyTime } from "../../date-tools/regional-time";
import { weeklyReset } from "../../event-times/event-times";

export default function render({ currentDate }) {
    const currentDay = parseInt(getFormattedSkyTime(currentDate, 'i'));

    const eventData = weeklyReset;
    const minutesToMidnight = getMinutesToNextEvent(currentDate, eventData);
    const daysUntilReset = minutesToMidnight === 0 ? 7 - currentDay : 6 - currentDay;

    const nextEventDate = add(currentDate, { days: daysUntilReset, minutes: minutesToMidnight });

    return (
        <div id="weekly-reset">{`Next weekly reset on ${format(nextEventDate, 'EEEE')} at ${format(nextEventDate, 'HH:mm')}`}</div>
    );

}