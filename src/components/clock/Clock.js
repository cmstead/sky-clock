import Time from "../time/Time";
import { getLocalTime, getSkyTime } from "../../date-tools/regional-time";

import "./Clock.css"

export default function render ({ date }) {
    const { hour: skyHour, minute: skyMinutes, second: skySeconds } = getSkyTime(date);
    const { hour: localHour, minute: localMinutes, second: localSeconds } = getLocalTime(date);

    return (<div className="clock">
        <div id="sky-standard-time" className="clock-display sky"><span className="label">Sky Mean Time:</span> <Time hour={skyHour} minute={skyMinutes} second={skySeconds}></Time></div>
        <div id="local-time" className="clock-display local"><span className="label">Local Time:</span>  <Time hour={localHour} minute={localMinutes} second={localSeconds}></Time></div>
    </div>);
}