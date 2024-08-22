import Time from "../time/Time";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

import "./Event.css";
import useNotification from "../../hooks/useNotification";


export default function Event({ eventData, currentDate }) {
    const [isSubscribed, toggleNotificationSubscription] = useNotification({ eventData, currentDate });
    const { hour, minute, hoursOffset, minutesOffset } = eventData.offsetData;

    return (
        <tr className="event">
            <td className="notification">
                <FontAwesomeIcon
                    className="bell"
                    data-active={isSubscribed}
                    icon={faBell}
                    onClick={toggleNotificationSubscription} />
            </td>
            <td>{eventData.name}</td>
            <td>{eventData.isToday() ? <Time hour={hour} minute={minute}></Time> : 'No event today'}</td>
            <td>{eventData.isToday() ? `${hoursOffset}h ${minutesOffset}m` : ''}</td>
        </tr>
    );
}
