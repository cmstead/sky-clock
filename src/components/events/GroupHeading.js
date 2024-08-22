export default function GroupHeading({ eventData }) {
    return (
        <tr className="heading" key={eventData.group}>
            <td colSpan="4">{eventData.group}</td>
        </tr>
    )
}