import Event from "./Event";
import "./Events.css";
import GroupHeading from "./GroupHeading";
import getSortedAndGroupedEventData from "./getSortedAndGroupedEventData";
import useLocalstorage from "../../hooks/localstorage";

export default function Events({ currentDate }) {  
    const [collapsedGroups, setCollapsedGroups] = useLocalstorage("collapsedGroups", new Set());

    const toggleGroupCollapse = (groupKey) => {
        setCollapsedGroups((prev) => {
            const newCollapsedGroups = new Set(prev);
            if (newCollapsedGroups.has(groupKey)) {
                newCollapsedGroups.delete(groupKey);
            } else {
                newCollapsedGroups.add(groupKey);
            }
            return newCollapsedGroups;
        });
    };

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
                                isGroupRecord(eventData) ? (
                                    <GroupHeading
                                        eventData={eventData}
                                        key={`group-${eventData.group}`}
                                        isCollapsed={collapsedGroups.has(eventData.group)}
                                        onToggle={() => toggleGroupCollapse(eventData.group)}
                                    />
                                ) : !collapsedGroups.has(eventData.type.name) && eventData.showInClock() ? (
                                    <Event
                                        eventData={eventData}
                                        currentDate={currentDate}
                                        key={eventData.key}
                                    />
                                ) : null
                            )
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