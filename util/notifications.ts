class Notifier {
    constructor() {}

    RequestPermission() {
        Notification.requestPermission();
    }

    ShowNotification(heading, body) {
        console.log('hi');
        const t = new Notification(heading, {
            body,
            icon: '/icon.png'
        });
        console.log(t);
    }
}

export default new Notifier();