import Time from "../time/Time";
import { getLocalTime, getSkyTime } from "../../date-tools/regional-time";

export default function render ({ date }) {
    const { hour: skyHour, minute: skyMinutes, second: skySeconds } = getSkyTime(date);
    const { hour: localHour, minute: localMinutes, second: localSeconds } = getLocalTime(date);

    return (<div className="clock">
        <div id="sky-standard-time">Sky Standard Time: <Time hour={skyHour} minute={skyMinutes} second={skySeconds}></Time></div>
        <div id="local-time">Local Time:  <Time hour={localHour} minute={localMinutes} second={localSeconds}></Time></div>
    </div>);
}