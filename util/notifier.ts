class Notifier {
    constructor() {}

    RequestPermission(): void {
        if (!this.CanUseNotifications()) return;
        Notification.requestPermission(() => {
            this.ShowNotification('Enabled Notifications!', 'You will now receive a notification when the timer completes.')
        });
    }

    CanUseNotifications(): boolean {
        return ("Notification" in window);
    }

    ShowNotification(heading: string, body: string): void {
        if (!this.CanUseNotifications()) return;
        const t = new Notification(heading, {
            body,
            icon: '/icon.png'
        });
    }

    HasPermission(): boolean {
        if (!this.CanUseNotifications()) return;
        if (Notification.permission == 'granted') return true;
        return false;
    }
}

export default new Notifier();