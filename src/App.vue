<template>
    <NavbarComponent/>
    <div class="container global-margins container-custom">
        <AlertNotificationComponent/>
        <router-view></router-view>
    </div>
</template>

<script>
import NavbarComponent from "./shared/components/NavbarComponent.vue";
import AlertNotificationComponent from "@/shared/components/AlertNotificationComponent.vue";


// import {AuthUtil} from "@/auth/misc/AuthUtil";
// import {getMessaging, onMessage} from "firebase/messaging";
// import {initializeApp} from "firebase/app";
//
// const firebaseConfig = {
//     apiKey: "AIzaSyD0TFvGfyikRT5xnHexwZJiwYDOIAUUR-Y",
//     authDomain: "healthy-notification.firebaseapp.com",
//     projectId: "healthy-notification",
//     storageBucket: "healthy-notification.appspot.com",
//     messagingSenderId: "777226129280",
//     appId: "1:777226129280:web:bedc06123d9df9a101fb65",
//     measurementId: "G-4J8V3Y2EKN"
// };
//
// initializeApp(firebaseConfig);
//
// const messaging = getMessaging();
//
// onMessage(messaging, (payload) => {
//     console.log("Message received. ", payload);
//     // this.$store.commit("setPushNotification", payload.notification.title + "! " + payload.notification.body);
// });
//
// navigator.serviceWorker
//     .register("/firebase-messaging-sw.js", {scope: "/firebase-cloud-messaging-push-scope"});

// getToken(messaging,
//     {vapidKey: "BDwM5GScO3-AZjdyk40lvdlRwp_WMDZLZ5EjJxm8L9JV8O-D4mr7w7RVhuAcwg6vksVrUToyNtWLtlBBc5pJgD0"})
//     .then(async (currentToken) => {
//         if (currentToken) {
//             console.log("currentToken: ", currentToken);
//             let requestDto = {
//                 firebaseClientToken: currentToken
//             };
//             await setFirebaseClientToken(requestDto);
//
//         } else {
//             console.log("No registration token available. Request permission to generate one.");
//         }
//     }).catch((err) => {
//     console.log("An error occurred while retrieving token. ", err);
// });

// async function setFirebaseClientToken(requestBody) {
//     let token = AuthUtil.getToken();
//     const response = await fetch("/api/v1/calendar/notification/setFirebaseClientToken", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`
//         },
//         body: JSON.stringify(requestBody)
//     });
//     // const data = await response.json();
//     return {
//         status: response.status,
//         // body: data
//     };
// }

export default {
    name: "App",

    components: {
        NavbarComponent,
        AlertNotificationComponent
    },

    mounted() {
        const channel = new BroadcastChannel('firebase-push-channel');
        channel.addEventListener('message', event => {
            console.log('[App.mounted] ', event.data);
            this.$store.commit(
                "setPushNotification", event.data.notification.title + "! " + event.data.notification.body);
        });
    },

    // async created() {
    //     const firebaseConfig = {
    //         apiKey: "AIzaSyD0TFvGfyikRT5xnHexwZJiwYDOIAUUR-Y",
    //         authDomain: "healthy-notification.firebaseapp.com",
    //         projectId: "healthy-notification",
    //         storageBucket: "healthy-notification.appspot.com",
    //         messagingSenderId: "777226129280",
    //         appId: "1:777226129280:web:bedc06123d9df9a101fb65",
    //         measurementId: "G-4J8V3Y2EKN"
    //     };
    //     initializeApp(firebaseConfig);
    //     const messaging = getMessaging();
    //
    //     onMessage(messaging, (payload) => {
    //         console.log("Message received. ", payload);
    //         this.$store.commit("setPushNotification",
    //             payload.notification.title + "! " + payload.notification.body);
    //     });
    //
    //     await navigator.serviceWorker
    //         .register("/firebase-messaging-sw.js", {scope: "/firebase-cloud-messaging-push-scope"})
    //
    //     getToken(messaging,
    //         {vapidKey: "BDwM5GScO3-AZjdyk40lvdlRwp_WMDZLZ5EjJxm8L9JV8O-D4mr7w7RVhuAcwg6vksVrUToyNtWLtlBBc5pJgD0"})
    //         .then(async (currentToken) => {
    //             if (currentToken) {
    //                 console.log("currentToken: ", currentToken);
    //                 let requestDto = {
    //                     firebaseClientToken: currentToken
    //                 };
    //                 await this.setFirebaseClientToken(requestDto);
    //
    //             } else {
    //                 console.log("No registration token available. Request permission to generate one.");
    //             }
    //         }).catch((err) => {
    //         console.log("An error occurred while retrieving token. ", err);
    //     });
    //
    // },

    // methods: {
    //     async setFirebaseClientToken(requestBody) {
    //         let token = AuthUtil.getToken();
    //         const response = await fetch("/api/v1/calendar/notification/setFirebaseClientToken", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${token}`
    //             },
    //             body: JSON.stringify(requestBody)
    //         });
    //         // const data = await response.json();
    //         return {
    //             status: response.status,
    //             // body: data
    //         };
    //     }
    // }
}
</script>
