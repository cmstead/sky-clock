import Event from "./Event";

import "./Events.css";

import { eventNames } from "../../event-times/event-times";

export default function render({ currentDate }) {
    const eventKeyNames = Object.keys(eventNames);

    return (
        <div className="events-table">
            <table id="events">
                <thead>
                    <tr>
                        <th>Event Name</th>
                        <th>Next Event</th>
                        <th>Time to Next</th>
                    </tr>
                </thead>
                <tbody>
                    {eventKeyNames.map((eventKeyName) => {
                        const eventKey = eventNames[eventKeyName];
                        return (<Event eventKey={eventKey} currentDate={currentDate} key={eventKey}></Event>);
                    })}
                </tbody>
            </table>
        </div>
    );
}