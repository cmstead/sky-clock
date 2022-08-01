import Event from "./Event";

import { eventNames } from "../../event-times/event-times";

export default function render({ currentDate }) {
    return (
        <div id="events">
            {Object.keys(eventNames).map((eventKeyName) => {
                const eventKey = eventNames[eventKeyName];
                return (<Event eventKey={eventKey} currentDate={currentDate} key={eventKey}></Event>);
            })}
        </div>
    );
}