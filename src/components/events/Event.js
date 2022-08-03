import Time from "../time/Time";
import { NotificationService } from '../../services/notification-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

import "./Event.css";
import { useReducer } from 'react';

export default function Event({ eventData }) {
    const { date, hour, minute, hoursOffset, minutesOffset } = eventData.offsetData;
    const [, updateUi] = useReducer(x => x + 1, 0);

    const minutesToNextEvent = hoursOffset * 60 + minutesOffset;

    // Check for notification
    const notifyMinutes = eventData.notification?.minutes ?? 5; 
    const lastNotify = NotificationService.getLastNotify(eventData.key);
    const isSubscribed = NotificationService.isSubscribed(eventData.key);
    const shouldNotify = isSubscribed 
        && minutesToNextEvent <= notifyMinutes
        && lastNotify < (date.getTime() - (notifyMinutes+1) * 60000);
    
    // Show notification
    if (shouldNotify) {
        const notification = {
            title: eventData.notification?.title ?? 'Sky Clock',
            body: eventData.notification?.body ?? `Event ${eventData.name} is about to begin!`,
            image: eventData.notification?.image
        };
        notification.body = notification.body?.replace('{t}', minutesToNextEvent);
        NotificationService.notify(eventData.key, notification);
    }

    // Toggle notification subscription for this event
    const subscribeNotification = () => {
        NotificationService.toggleSubscription(eventData.key);
        updateUi();
    }

    return (
        <tr className="event">
            <td><FontAwesomeIcon className="bell" data-active={isSubscribed} icon={faBell} onClick={subscribeNotification} /></td>
            <td>{eventData.name}</td>
            <td><Time hour={hour} minute={minute}></Time></td>
            <td>{`${hoursOffset}h ${minutesOffset}m`}</td>
        </tr>
    );
}