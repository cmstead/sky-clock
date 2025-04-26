export default function GroupHeading({ eventData, isCollapsed, onToggle }) {
    return (
        <tr className="heading" key={eventData.group}>
            <td colSpan="4" onClick={onToggle} style={{ cursor: "pointer" }}>
                <div className="group-heading-container">
                    <span className="group-text">{eventData.group}</span>
                    <span className="arrow">{isCollapsed ? "▶" : "▼"}</span>
                </div>
            </td>
        </tr>
    );
}