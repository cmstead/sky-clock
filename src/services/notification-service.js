if (Notification.permission !== 'granted') {
    Notification.requestPermission();
}

export function notify(notificationData) {
    new Notification(notificationData.title, notificationData);
}
