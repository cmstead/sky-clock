const supportsNotifications = typeof(Notification) === 'function';

if (supportsNotifications && Notification.permission !== 'granted') {
    Notification.requestPermission();
}

export function notify(notificationData) {
    if (!supportsNotifications || Notification.permission !== 'granted') return;
    const notification = new Notification(notificationData.title, notificationData);

    // Notifications do something weird to mobile chrome. This will clear the notification so the user can interact again
    setTimeout(() => notification.close(), 30000);
}
