const BASE_URL = "http://localhost:3000/";
const ENDPOINTS = ["rooms", "guests", "bookings"];

export function getEndpoints() {
    return ENDPOINTS;
}

export async function getFromAPI(endpoint) {
    const RESPONSE = await fetch(`${BASE_URL}${endpoint}`);
    return RESPONSE.json();
}