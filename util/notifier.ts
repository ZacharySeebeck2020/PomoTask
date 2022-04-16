class Notifier {
    constructor() {}

    RequestPermission(): void {
        Notification.requestPermission(() => {
            this.ShowNotification('Enabled Notifications!', 'You will now receive a notification when the timer completes.')
        });
    }

    ShowNotification(heading: string, body: string): void {
        const t = new Notification(heading, {
            body,
            icon: '/icon.png'
        });
        console.log(t);
    }

    HasPermission(): boolean {
        if (Notification.permission == 'granted') return true;

        return false;
    }
}

export default new Notifier();