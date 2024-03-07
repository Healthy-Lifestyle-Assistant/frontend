importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyD0TFvGfyikRT5xnHexwZJiwYDOIAUUR-Y",
    authDomain: "healthy-notification.firebaseapp.com",
    projectId: "healthy-notification",
    storageBucket: "healthy-notification.appspot.com",
    messagingSenderId: "777226129280",
    appId: "1:777226129280:web:bedc06123d9df9a101fb65",
    measurementId: "G-4J8V3Y2EKN"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("[firebase-messaging-sw.js] Received background message ", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/notification.png"
    };
    self.registration.showNotification(notificationTitle, notificationOptions);

    const channel = new BroadcastChannel('firebase-push-channel');
    channel.postMessage(payload);
});
