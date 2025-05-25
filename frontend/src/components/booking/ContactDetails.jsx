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
            alert("Please fill in all fields!");
            return;
        }

        if (!emailRegex.test(email)) {
            alert("Please enter a valid email!");
            return;
        }

        if (!phoneRegex.test(phone)) {
            alert("Please enter a valid phone number!");
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
                <label className="user-contact-details-form-label">Name: </label>
                <input className="user-contact-details-form-input" value={name} type="text"
                       onChange={(e) => setName(e.target.value)}/>
                <label className="user-contact-details-form-label">Email: </label>
                <input className="user-contact-details-form-input" value={email} type="email"
                       onChange={(e) => setEmail(e.target.value)}/>
                <label className="user-contact-details-form-label">Phone: </label>
                <input className="user-contact-details-form-input" value={phone} type="tel"
                       onChange={(e) => setPhone(e.target.value)}/>
                <button className="user-contact-details-form-button" onClick={submitBooking}>Book room(s)</button>
            </div>
        </div>
    );
}

export default ContactDetails;