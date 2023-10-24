export function getToken() {
    const token = localStorage.getItem("token");
    if (token === null || token === "") return null;
    return token;
}

export async function getAndValidateToken() {
    const token = localStorage.getItem("token");

    if (token === null) return null;

    if (token === "") {
        localStorage.removeItem("token");
        return null;
    }

    let URL = "/api/v1/users/auth/validate";

    const res = await fetch(URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (res.status === 200) return token;

    localStorage.removeItem("token");
    
    return null;
}
