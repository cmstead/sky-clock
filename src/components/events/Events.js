import Event from "./Event";

import "./Events.css";

import { eventNames, eventTimes, eventTypeNames } from "../../event-times/event-times";
import { getEventOffset } from "../../date-tools/event-time-offset";

export default function render({ currentDate }) {

    function getEventData() {
        const eventKeyNames = Object.keys(eventNames);

        const eventRecords = eventKeyNames.map((eventKeyName) => {
            const eventData = eventTimes[eventNames[eventKeyName]];

            eventData.offsetData = getEventOffset(eventData, currentDate);

            return eventData;
        });

        eventRecords.sort((eventRecord1, eventRecord2) => {
            if (eventRecord1.type > eventRecord2.type) {
                return 1;
            } else if (eventRecord1.type === eventRecord2.type &&
                eventRecord1.offsetData.minutesToNextEvent > eventRecord2.offsetData.minutesToNextEvent) {
                return 1;
            } else if (eventRecord1.type === eventRecord2) {
                return 0;
            } else {
                return -1;
            }
        });

        let lastType = -1;

        const finalEventRecordset = [];

        eventRecords.forEach((eventRecord) => {
            if (eventRecord.type !== lastType) {
                finalEventRecordset.push({ group: eventTypeNames[eventRecord.type] });
            }

            finalEventRecordset.push(eventRecord);

            lastType = eventRecord.type;
        });

        return finalEventRecordset;
    }

    function getGroupHeader({ group: groupName }) {
        return (
            <tr className="heading" key={groupName}>
                <td colSpan="3">{groupName}</td>
            </tr>
        );
    }

    function getEventElement(eventRecord) {
        return (<Event eventData={eventRecord} key={eventRecord.key}></Event>)
    }

    function isGroupRecord(eventRecord) {
        return eventRecord.group !== undefined;
    }

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
                    {
                        getEventData()
                            .map((eventData) =>
                                isGroupRecord(eventData)
                                    ? getGroupHeader(eventData)
                                    : getEventElement(eventData))

                    }
                </tbody>
            </table>
        </div>
    );
}