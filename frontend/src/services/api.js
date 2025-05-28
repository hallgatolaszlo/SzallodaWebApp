const BASE_URL = import.meta.env.PROD
    ? "https://szalloda-web-app.onrender.com/api/"
    : "http://localhost:3001/api/";

export async function getFromAPI(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export async function login(username, password) {
    const response = await fetch(`${BASE_URL}accounts/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password}),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export async function register(username, password) {
    const response = await fetch(`${BASE_URL}accounts/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password}),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export async function postGuest(guestData) {
    const {name, email, phone, accountId} = guestData;
    const response = await fetch(`${BASE_URL}guests`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            email,
            phone,
            accountId
        }),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export async function updateGuest(guestData) {
    const {id, name, email, phone} = guestData;
    const response = await fetch(`${BASE_URL}guests/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            email,
            phone
        }),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export async function postBooking(bookingData) {
    const {roomId, guestId, guestCount, cost, start, end} = bookingData;
    const response = await fetch(`${BASE_URL}bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            roomId,
            guestId,
            guestCount,
            start,
            end,
            cost,
        }),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export async function updateBooking(id, bookingData) {
    const {guestCount, start, end, cost} = bookingData;
    const response = await fetch(`${BASE_URL}bookings/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            guestCount,
            start,
            end,
            cost,
        }),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export async function removeFromDB(endpoint, id) {
    const response = await fetch(`${BASE_URL}${endpoint}/${id}`, {
        method: "DELETE"
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export async function postRating(guestId, username, rating, text) {
    const response = await fetch(`${BASE_URL}ratings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            guestId: guestId.toString(),
            username: username.toString(),
            rating: rating.toString(),
            text: text.toString()
        }),
    });
    return response.json();
}