import { VALIDATE } from "../URL.js";
import { SESSION_EXPIRED, WARNING, CREATE_ENTITY } from "../Messages";

export function getToken() {
    const token = localStorage.getItem("token");
    if (token === null || token === "") return null;
    return token;
}

export async function getAndValidateToken(obj) {
    const token = localStorage.getItem("token");
    if (token === null) return null;
    if (token === "") {
        localStorage.removeItem("token");
        return null;
    }

    const response = await fetch(VALIDATE, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (response.status === 200) {
        const body = await response.json();
        obj.$store.commit("setUserFullName", body[1]);
        return token;
    }

    localStorage.removeItem("token");
    return null;
}

export function removeToken() {
    localStorage.removeItem("token");
}

export function on401(obj) {
    removeToken();
    obj.$store.commit("setLogged", false);
    obj.$store.commit("setSharedMessageType", WARNING);
    obj.$store.commit("setSharedMessage", SESSION_EXPIRED);
    obj.$router.push("/login");
}

export function redirectToLoginSessionExpired(obj) {
    obj.$store.commit("setLogged", false);
    obj.$store.commit("setSharedMessageType", WARNING);
    obj.$store.commit("setSharedMessage", SESSION_EXPIRED);
    obj.$router.push("/login");
}

export function redirectToLoginCreateNewEntity(obj) {
    obj.$store.commit("setLogged", false);
    obj.$store.commit("setSharedMessageType", WARNING);
    obj.$store.commit("setSharedMessage", CREATE_ENTITY);
    obj.$router.push("/login");
}