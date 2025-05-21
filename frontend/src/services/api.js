const BASE_URL = "http://localhost:3000/";
const ENDPOINTS = ["rooms", "guests", "bookings"];

export function getEndpoints() {
    return ENDPOINTS;
}

export async function getFromAPI(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    return response.json();
}