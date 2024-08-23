import Event from "./Event";
import "./Events.css";
import GroupHeading from "./GroupHeading";

import getSortedAndGroupedEventData from "./getSortedAndGroupedEventData";

export default function render({ currentDate }) {

    function isGroupRecord(eventRecord) {
        return eventRecord.group !== undefined;
    }

    return (
        <div className="events-table">
            <table id="events">
                <thead>
                    <tr>
                        <th className="notification"></th>
                        <th>Event Name</th>
                        <th>Next Event</th>
                        <th>Time to Next</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        getSortedAndGroupedEventData(currentDate)
                            .map((eventData, index) =>
                                isGroupRecord(eventData)
                                    ? <GroupHeading
                                        eventData={eventData}
                                        key={`group-${eventData.group}`}></GroupHeading>
                                    : eventData.showInClock() ?
                                        <Event
                                            eventData={eventData}
                                            currentDate={currentDate}
                                            key={eventData.key}></Event>
                                        : '')

                    }
                    <tr className="heading">
                        <td colSpan="4">
                            Shard Events: <a href="https://sky-shards.pages.dev" target="_blank" rel="noreferrer">visit calendar</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
