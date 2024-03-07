import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import {createApp} from "vue";
import {createMetaManager} from "vue-meta";
import {getMessaging, onMessage} from "firebase/messaging";
import {initializeApp} from "firebase/app";
import "./style/style.css";


const firebaseConfig = {
    apiKey: "AIzaSyD0TFvGfyikRT5xnHexwZJiwYDOIAUUR-Y",
    authDomain: "healthy-notification.firebaseapp.com",
    projectId: "healthy-notification",
    storageBucket: "healthy-notification.appspot.com",
    messagingSenderId: "777226129280",
    appId: "1:777226129280:web:bedc06123d9df9a101fb65",
    measurementId: "G-4J8V3Y2EKN"
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    let message = payload.notification["title"] + "!";
    if (payload.notification["body"] !== null || payload.notification["body"] !== undefined) {
        message += " " + payload.notification["body"];
    }
    store.commit("setPushNotification", message);
});

navigator.serviceWorker
    .register("/firebase-messaging-sw.js",
        {scope: "/firebase-cloud-messaging-push-scope"})
    .then((registration) => {
        console.log('Service worker registered:', registration);
    })
    .catch((error) => {
        console.error('Error registering service worker:', error);
    });

const app = createApp(App);
app
    .use(store)
    .use(router)
    .use(createMetaManager())
    .provide("messaging", messaging)
    .mount('#app');
