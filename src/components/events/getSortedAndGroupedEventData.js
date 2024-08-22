import { eventNames, eventDefinitions } from "../../event-data/event-data";
import { getEventOffset } from "../../date-tools/event-time-offset";

function buildEventRecords(eventNames, eventDefinitions, currentDate) {
    return Object.values(eventNames)
        .map((eventKeyName) => {
            const eventData = eventDefinitions[eventKeyName];

            eventData.offsetData = getEventOffset(eventData, currentDate);

            return eventData;
        });
}

function sortEventRecords(eventRecords) {
    eventRecords.sort((eventRecord1, eventRecord2) => {
        const timeOffset1 = eventRecord1.offsetData.minutesToNextEvent;
        const timeOffset2 = eventRecord2.offsetData.minutesToNextEvent;

        const offsetsAreEqual = timeOffset1 === timeOffset2;
        const offset1IsGreater = timeOffset1 > timeOffset2;

        const position1 = eventRecord1.type.position;
        const position2 = eventRecord2.type.position;

        const positionsAreEqual = position1 === position2;
        const position1IsGreater = position1 > position2;

        const noEventToday = !eventRecord1.isToday();

        if (position1IsGreater || (positionsAreEqual && (noEventToday || offset1IsGreater))) {
            return 1;
        } else if (positionsAreEqual && offsetsAreEqual) {
            return 0;
        } else {
            return -1;
        }
    });
}

function buildEventDataForDisplay(eventRecords) {
    let lastType = -1;

    const finalEventRecordset = [];

    eventRecords.forEach((eventRecord) => {
        if (eventRecord.type.position !== lastType) {
            finalEventRecordset.push({ group: eventRecord.type.name });
        }

        finalEventRecordset.push(eventRecord);

        lastType = eventRecord.type.position;
    });

    return finalEventRecordset;
}

export default function getSortedAndGroupedEventData(currentDate) {

    const eventRecords = buildEventRecords(eventNames, eventDefinitions, currentDate);

    sortEventRecords(eventRecords);

    return buildEventDataForDisplay(eventRecords)
}