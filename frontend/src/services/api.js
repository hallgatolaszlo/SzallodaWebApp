const BASE_URL = "http://localhost:3000/";

//  BASE_URL = "https://szallodawebapp.onrender.com/";

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

export async function postGuest(guestData) {
    const {id, name, email, phone, accountId} = guestData;
    const response = await fetch(`${BASE_URL}guests`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id.toString(),
            name: name.toString(),
            email: email.toString(),
            phone: phone.toString(),
            accountId: accountId.toString()
        }),
    });
    return response.json();
}

export async function putGuest(guestData) {
    const {id, name, email, phone, accountId} = guestData;
    const response = await fetch(`${BASE_URL}guests/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id.toString(),
            name: name.toString(),
            email: email.toString(),
            phone: phone.toString(),
            accountId: accountId.toString()
        }),
    });
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
            roomId: roomId.toString(),
            guestId: guestId.toString(),
            guestCount: guestCount.toString(),
            start: start.toString(),
            end: end.toString(),
            cost: cost.toString(),
        }),
    });
    return response.json();
}

export async function removeFromDB(endpoint, id) {
    const response = await fetch(`${BASE_URL}${endpoint}/${id}`, {
        method: "DELETE",
    });
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