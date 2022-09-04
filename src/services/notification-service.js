const supportsNotifications = typeof(Notification) === 'function';

if (supportsNotifications && Notification.permission !== 'granted') {
    Notification.requestPermission();
}

export function notify(notificationData) {
    if (!supportsNotifications) return;
    new Notification(notificationData.title, notificationData);
}
