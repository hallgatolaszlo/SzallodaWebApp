import "../../css/booking/ContactDetails.css";
import {useState} from "react";
import {useRoomsAndBookingsContext} from "../../contexts/RoomsAndBookingsContext.jsx";
import {useLoginContext} from "../../contexts/LoginContext.jsx";
import {postBooking, postGuest} from "../../services/api.js";

function ContactDetails() {
    const {selectedBookings, guests} = useRoomsAndBookingsContext();
    const {userAccountId} = useLoginContext();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    async function submitBooking() {
        let error = false;
        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
        const phoneRegex = /\b(?:\+?(\d{1,3})[\s.-]?)?(?:\(?\d{2,4}\)?[\s.-]?)?\d{3,4}[\s.-]?\d{4}\b/;

        if (name === '' || email === '' || phone === '') {
            return;
        }

        if (!emailRegex.test(email)) {
            return;
        }

        if (!phoneRegex.test(phone)) {
            return;
        }

        const guestData = {
            id: guests.length + 1,
            name: name,
            email: email,
            phone: phone,
            accountId: userAccountId
        };

        await postGuest(guestData).catch((e) => {
            console.log(e);
            error = true;
        });

        if (error) {
            return;
        }

        Object.values(selectedBookings).forEach(type => type.forEach(async booking => {
            booking["guestId"] = guestData.id;
            console.log(booking);
            await postBooking(booking).catch((e) => {
                console.log(e);
                error = true;
            });
        }));

        if (error) {
            return;
        }

        alert("Booking successful!");
        window.location.reload();
    }

    return (
        <div className="user-contact-details-container">
            <h1>Contact Details</h1>
            <div className="user-contact-details-form">
                <label>Name: </label>
                <input value={name} type="text" onChange={(e) => setName(e.target.value)}/>
                <span>{}</span>
                <label>Email: </label>
                <input value={email} type="email" onChange={(e) => setEmail(e.target.value)}/>
                <label>Phone: </label>
                <input value={phone} type="tel" onChange={(e) => setPhone(e.target.value)}/>
                <button onClick={submitBooking}>Confirm</button>
            </div>
        </div>
    );
}

export default ContactDetails;