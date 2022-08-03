const STORAGE_NOTIFICATIONS = 'notifications';

export class NotificationService {
    static notifications = null;

    /**
     * Subscribes to the event.
     * If needed, asks user for notification permission.
     * @param key Event key.
     */
    static subscribe(key) {
        this.askPermission();

        this.notifications[key] = {
            notify: true,
            lastNotify: new Date().getTime() // Prevent immediate notification.
        };

        this.saveStorage();
    }

    /**
     * Unsubscribes from the event.
     * @param key Event key.
     */
    static unsubscribe(key) {
        delete this.notifications[key];
        this.saveStorage();
    }

    /**
     * Subscribes to or unsubscribes from an event.
     * @param key Event key.
     * @param force Force subscription. If omitted, toggles the subscription status.
     */
    static toggleSubscription(key, force) {
        const on = typeof force === 'boolean' ? force : !this.isSubscribed(key);
        return on ? this.subscribe(key) : this.unsubscribe(key);
    }

    /** Returns true if the user wants to receive notifications for this event. */
    static isSubscribed(key) {
        return this.notifications[key]?.notify ?? false;
    }

    /**
     * Show a notification.
     * @param key Event key.
     * @param data Notification data.
     * @returns True if notification is shown, false if user did not subscribe to this event.
     */
    static notify(key, data) {
        if (!this.notifications[key]?.notify) { return false; }

        // Update notify time to prevent multiple notifications per event.
        this.notifications[key].lastNotify = new Date().getTime()
        this.saveStorage();

        // Show notification
        new Notification(data.title, data);
        return true;
    }

    /**
     * Returns the time of the last notification for this event.
     * @param key Event key.
     * @returns Date.getTime() of last notification, or 0.
     */
    static getLastNotify(key) {
        return this.notifications[key]?.lastNotify || 0;
    }

    static resetLastNotify(key) {
        if (!this.notifications[key]) { return; }
        this.notifications[key].lastNotify = 0;
        this.saveStorage();
    }

    /** Asks for permission to send notifications. */
    static askPermission() {
        if (Notification.permission === 'granted') { return; }
        Notification.requestPermission();
    }

    /** Loads notification data from browser storage. */
    static loadStorage() {
        this.notifications = JSON.parse(localStorage.getItem(STORAGE_NOTIFICATIONS) || '{}')
    }

    /** Writes notification data to browser storage. */
    static saveStorage() {
        localStorage.setItem(STORAGE_NOTIFICATIONS, JSON.stringify(this.notifications));
    }
}

NotificationService.loadStorage();
if (true) {
    for (const key of Object.keys(NotificationService.notifications)) {
        const val = NotificationService.notifications[key];
        val.lastNotify = 0;
    }
}