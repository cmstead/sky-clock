import Time from "../time/Time";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

import "./Event.css";
import useNotification from "../../hooks/useNotification";


export default function Event({ eventData, currentDate }) {
    const [isSubscribed, toggleNotificationSubscription] = useNotification({ eventData, currentDate });
    const { day, hour, minute, hoursOffset, minutesOffset } = eventData.offsetData;

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const nextDay = Math.floor(hour / 24) + (day - 1);

    function TimeDayDisplay() {
        return (
            hoursOffset > 24 ?
                days[nextDay] :
                <Time day={day} hour={hour} minute={minute}></Time>
        );
    }

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
            <td>{eventData.isToday() ? TimeDayDisplay() : 'No event today'}</td>
            <td>{eventData.isToday() ? `${hoursOffset}h ${minutesOffset}m` : ''}</td>
        </tr>
    );
}
