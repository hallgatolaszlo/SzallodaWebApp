//LACINAK: EZ majd átkerülhetne a rendes api.js-be, de abba nem mertem plusz dolgot írni

const BASE_URL = "http://localhost:3000/";


export async function getRatingsFromAPI() {
    const response = await fetch(`${BASE_URL}ratings`);
    return response.json();
}