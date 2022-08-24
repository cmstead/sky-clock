import Time from "../time/Time";

export default function render({ eventData }) {
    const { hour, minute, hoursOffset, minutesOffset } = eventData.offsetData;

    return (
        <tr className="event">
            <td>{typeof eventData.name === 'function' ? eventData.name() : eventData.name}</td>
            <td><Time hour={hour} minute={minute}></Time></td>
            <td>{`${hoursOffset}h ${minutesOffset}m`}</td>
        </tr>
    );
}