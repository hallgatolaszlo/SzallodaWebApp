import Footer from "../components/Footer.jsx";
import '../css/my-bookings/MyBookings.css';
import {useRoomsAndBookingsContext} from "../contexts/RoomsAndBookingsContext.jsx";
import {useLoginContext} from "../contexts/LoginContext.jsx";
import {useEffect, useState} from "react";
import MyBooking from "../components/my-bookings/MyBooking.jsx";

function MyBookings() {
    const {rooms, guests, bookings} = useRoomsAndBookingsContext();
    const {isLoggedIn, userAccountId} = useLoginContext();

    const [guestId, setGuestId] = useState(null);
    const [accountBookings, setAccountBookings] = useState(null);
    const [bookingData, setBookingData] = useState(null);

    useEffect(() => {
        if (!accountBookings) return;
        console.log(accountBookings);
        let idCounter = 0;
        const newBookingData = accountBookings.map(booking => {
            const room = rooms.filter(room => room.id.toString() === booking.roomId.toString())[0];
            const guest = guests.filter(guest => guest.id.toString() === booking.guestId.toString())[0];
            return {
                id: idCounter++,
                room: room,
                guest: guest,
                guestCount: booking.guestCount,
                start: booking.start,
                end: booking.end,
                cost: booking.cost
            };
        });
        setBookingData(newBookingData);
    }, [accountBookings, guests, rooms]);

    useEffect(() => {
        if (!guests || !isLoggedIn) return;
        const guest = guests.filter(guest => guest.accountId.toString() === userAccountId.toString());
        if (!guest[0]) return;
        setGuestId(guest[0].id);
    }, [guests, userAccountId, isLoggedIn]);

    useEffect(() => {
        if (!bookings || !guestId) return;
        const accountBookings = bookings.filter(booking => booking.guestId.toString() === guestId.toString());
        accountBookings.sort((a, b) => {
            const af = new Date(a.start);
            const bf = new Date(b.start);
            const as = new Date(a.end);
            const bs = new Date(b.end);

            if (af === bf) {
                return (as < bs) ? -1 : (as > bs) ? 1 : 0;
            } else {
                return (af < bf) ? -1 : 1;
            }
        });
        setAccountBookings(accountBookings);
    }, [bookings, userAccountId, guestId]);

    if (!isLoggedIn) {
        return (
            <div className="myBookings-container">
                <h1 className="booking-login-warning">You must be logged in to view your bookings</h1>
            </div>
        );
    }

    return (
        <>
            <div className="myBookings-container">
                {!bookingData ? <h1 className="booking-login-warning">You have no bookings</h1> : ""}
                <div className="myBookings-grid">
                    {bookingData ? bookingData.map((booking) => {
                        if (new Date(booking.end) >= new Date()) {
                            return <MyBooking key={booking.id.toString()} bookingData={booking}></MyBooking>;
                        }
                    }) : ""}
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default MyBookings;