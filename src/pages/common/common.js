export function getToken() {
    const token = localStorage.getItem("token");
    if (token === null || token === "") return null;
    return token;
}
