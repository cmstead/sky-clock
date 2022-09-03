import Time from "../time/Time";
import { notify } from '../../services/notification-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

import "./Event.css";
import useLocalstorage from "../../hooks/localstorage";


function buildNotification(eventData, minutesToNextEvent) {
    const notification = {
        title: eventData.notification?.title ?? 'Sky Clock',
        body: eventData.notification?.body ?? `Event ${eventData.name} is about to begin!`,
        image: eventData.notification?.image
    };

    notification.body = notification.body?.replace('{t}', minutesToNextEvent);

    return notification;
}

export default function Event({ eventData }) {
    const notificationKey = `${eventData.key}-lastNotification`;
    const subscriptionKey = `${eventData.key}-isSubscribed`;

    const [lastNotification, setLastNotification] = useLocalstorage(notificationKey, new Date().getTime());
    const [isSubscribed, setSubscription] = useLocalstorage(subscriptionKey, false);

    const { date, hour, minute, hoursOffset, minutesOffset } = eventData.offsetData;
    
    //console.log('Event called for', eventData);
    (function showNotification() {

        const minutesToNextEvent = hoursOffset * 60 + minutesOffset;
        const notificationWindow = eventData.notification?.minutes ?? 5;
            
        const shouldNotify = isSubscribed
            && minutesToNextEvent <= notificationWindow
            && lastNotification < eventData.currentDate.getTime()
            && lastNotification < (date.getTime() - (notificationWindow + 1) * 60000);
        
        if (shouldNotify) {
            const notification = buildNotification(eventData, minutesToNextEvent);
            notify(notification);

            setLastNotification(eventData.currentDate.getTime());
        }
    })();

    const toggleNotificationSubscription = () => {
        setSubscription(!isSubscribed);
        setLastNotification(eventData.currentDate.getTime());
    }

    return (
        <tr className="event">
            <td><FontAwesomeIcon className="bell" data-active={isSubscribed} icon={faBell} onClick={toggleNotificationSubscription} /></td>
            <td>{eventData.name}</td>
            <td><Time hour={hour} minute={minute}></Time></td>
            <td>{`${hoursOffset}h ${minutesOffset}m`}</td>
        </tr>
    );
}