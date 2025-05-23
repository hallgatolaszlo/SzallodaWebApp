const BASE_URL = "http://localhost:3000/";
const ENDPOINTS = ["rooms", "guests", "bookings", "ratings", "accounts"];

export function getEndpoints() {
    return ENDPOINTS;
}

export async function getFromAPI(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    return response.json();
}

export async function postAccounts(username, password) {
    const response = await fetch(`${BASE_URL}accounts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username: username, password: password, role: "user"}),
    });
    return response.json();
}