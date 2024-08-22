import useLocalstorage from "./localstorage";
import { notify } from "../services/notification-service";

function buildNotification(eventData, minutesToNextEvent) {
    const notification = {
        title: eventData.notification?.title ?? 'Sky Clock',
        body: eventData.notification?.body ?? `Event ${eventData.name} is about to begin!`,
        image: eventData.notification?.image
    };

    notification.body = notification.body?.replace('{t}', minutesToNextEvent);

    return notification;
}

export default function useNotification({ eventData, currentDate }) {
    const { date, hoursOffset, minutesOffset } = eventData.offsetData;

    const notificationKey = `${eventData.key}-lastNotification`;
    const subscriptionKey = `${eventData.key}-isSubscribed`;

    const [lastNotification, setLastNotification] = useLocalstorage(notificationKey, new Date().getTime());
    const [isSubscribed, setSubscription] = useLocalstorage(subscriptionKey, false);

    const minutesToNextEvent = hoursOffset * 60 + minutesOffset;
    const notificationWindow = eventData.notification?.minutes ?? 5;

    const shouldNotify = isSubscribed
        && minutesToNextEvent <= notificationWindow
        && lastNotification < currentDate.getTime()
        && lastNotification < (date.getTime() - (notificationWindow + 1) * 60000);

    if (shouldNotify) {
        const notification = buildNotification(eventData, minutesToNextEvent);
        notify(notification);

        setLastNotification(currentDate.getTime());
    }

    const toggleNotificationSubscription = () => {
        setSubscription(!isSubscribed);
        setLastNotification(currentDate.getTime());
    }

    return [isSubscribed, toggleNotificationSubscription];
}