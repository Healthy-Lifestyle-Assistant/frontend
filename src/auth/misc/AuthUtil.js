import { UrlAuth } from "@/auth/misc/UrlAuth";
import { AlertMessageShared } from "@/shared/util/AlertMessageShared";
import { AlertMessageAuth } from "@/auth/misc/AlertMessageAuth";
import { getToken } from "firebase/messaging";

export class AuthUtil {
    static getToken() {
        const token = localStorage.getItem("token");
        if (token === null || token === "") return null;
        return token;
    }

    static async getAndValidateToken(obj) {
        const token = localStorage.getItem("token");
        if (token === null) return null;
        if (token === "") {
            localStorage.removeItem("token");
            return null;
        }

        const response = await fetch(UrlAuth.VALIDATE, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            const body = await response.json();
            obj.$store.commit("setUserFullName", body[1]);

            const vapidKey = localStorage.getItem("2");
            if (vapidKey === null || vapidKey === "") {
                localStorage.setItem("2", body[2]);
            }

            return token;
        }

        localStorage.removeItem("token");
        return null;
    }

    static removeToken() {
        localStorage.removeItem("token");
    }

    static on401(obj) {
        AuthUtil.removeToken();
        obj.$store.commit("setLogged", false);
        obj.$store.commit("setSharedMessageType", AlertMessageShared.WARNING);
        obj.$store.commit("setSharedMessage", AlertMessageAuth.SESSION_EXPIRED);
        obj.$router.push("/login");
    }

    static redirectToLoginSessionExpired(obj) {
        obj.$store.commit("setLogged", false);
        obj.$store.commit("setSharedMessageType", AlertMessageShared.WARNING);
        obj.$store.commit("setSharedMessage", AlertMessageAuth.SESSION_EXPIRED);
        obj.$router.push("/login");
    }

    static redirectToLoginCreateNewEntity(obj) {
        obj.$store.commit("setLogged", false);
        obj.$store.commit("setSharedMessageType", AlertMessageShared.WARNING);
        obj.$store.commit("setSharedMessage", AlertMessageShared.CREATE_ENTITY);
        obj.$router.push("/login");
    }

    static redirectToLoginFromCalendar(obj) {
        obj.$store.commit("setLogged", false);
        obj.$store.commit("setSharedMessageType", AlertMessageShared.WARNING);
        obj.$store.commit("setSharedMessage", AlertMessageShared.UNAUTHORIZED_CALENDAR);
        obj.$router.push("/login");
    }

    static redirectToLoginFromStats(obj) {
        obj.$store.commit("setLogged", false);
        obj.$store.commit("setSharedMessageType", AlertMessageShared.WARNING);
        obj.$store.commit("setSharedMessage", AlertMessageShared.UNAUTHORIZED_STATS);
        obj.$router.push("/login");
    }

    static handleFirebaseUserToken(messaging) {
        let vapidKey = localStorage.getItem("2");
        let firebaseUserTokenFromLocalStorage = localStorage.getItem("3");

        getToken(messaging,
            { vapidKey: vapidKey })
            .then(async (receivedToken) => {
                if (receivedToken) {
                    const requestDto = {
                        firebaseUserTokenFromLocalStorage: firebaseUserTokenFromLocalStorage,
                        firebaseUserTokenNowReceived: receivedToken
                    };
                    await AuthUtil.handleFirebaseUserTokenRestApi(requestDto);
                    localStorage.setItem("3", receivedToken);
                } else {
                    console.log("No registration token available. Request permission to generate one.");
                }
            }).catch((err) => {
                console.log("An error occurred while retrieving token. ", err);
            });
    }

    static async handleFirebaseUserTokenRestApi(requestDto) {
        let token = AuthUtil.getToken();
        let response = await fetch("/api/v1/calendar/notification/handleFirebaseUserToken", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(requestDto)
        });
        // const data = await response.json();
        return {
            status: response.status,
            // body: data
        };
    }
}