import Footer from "../components/Footer.jsx";
import '../css/my-bookings/MyBookings.css';
import {useRoomsAndBookingsContext} from "../contexts/RoomsAndBookingsContext.jsx";
import {useLoginContext} from "../contexts/LoginContext.jsx";
import {createElement, useEffect, useState} from "react";
import MyBooking from "../components/my-bookings/MyBooking.jsx";
import {format} from "date-fns";
import ChangeContactDetails from "../components/my-bookings/ChangeContactDetails.jsx";
import RatingSystem from "../components/my-bookings/RatingSystem.jsx";

function MyBookings() {
    const {rooms, guests, bookings, loading} = useRoomsAndBookingsContext();
    const {isLoggedIn, userAccountId} = useLoginContext();

    const [guestId, setGuestId] = useState(null);
    const [guestData, setGuestData] = useState(null);
    const [accountBookings, setAccountBookings] = useState(null);
    const [bookingData, setBookingData] = useState(null);

    useEffect(() => {
        if (!guests || !guestId) return;
        setGuestData(guests.find(guest => guest.id.toString() === guestId.toString()));
    }, [guests, guestId]);

    useEffect(() => {
        if (!accountBookings || !rooms) return;
        const newBookingData = {};
        accountBookings.forEach(booking => {
            const key = `${format(booking.start, 'yyyy/MM/dd')} - ${format(booking.end, 'yyyy/MM/dd')}`;
            const room = rooms.filter(room => room.id.toString() === booking.roomId.toString())[0];
            if (!(key in newBookingData)) {
                newBookingData[key] = [];
            }
            newBookingData[key].push({
                room: room,
                booking: booking
            });
        });
        const orderedBookingData = Object.keys(newBookingData).sort().reduce((obj, key) => {
            obj[key] = newBookingData[key];
            return obj;
        }, {});
        setBookingData(orderedBookingData);
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
        setAccountBookings(accountBookings);
    }, [bookings, userAccountId, guestId]);

    if (loading) {
        return (
            <div className="my-bookings-container">
                <h1 className="booking-login-warning">Loading...</h1>
            </div>
        );
    }
    if (!isLoggedIn) {
        return (
            <div className="my-bookings-container">
                <h1 className="booking-login-warning">You must be logged in to view your bookings</h1>
            </div>
        );
    }

    if (bookingData === null) {
        return (
            <div className="my-bookings-container">
                <h1 className="booking-login-warning">You have no bookings</h1>
            </div>
        );
    }

    let id = -1;
    let active = 0;
    let expired = 0;

    // noinspection JSCheckFunctionSignatures
    return (
        <div className="my-bookings-page">
            <div className="my-bookings-container">
                <ChangeContactDetails guestData={guestData}/>
                <hr className="booking-hr"/>
                <h1>Active Bookings:</h1>
                <div className="my-bookings-grid">
                    {Object.entries(bookingData).map((keyValuePair) => {
                        const date = keyValuePair[0];
                        const bookingsOnDate = keyValuePair[1];
                        if (new Date(date.split(' ')[2]) >= new Date()) {
                            id++;
                            active++;
                            return (
                                <MyBooking key={id} id={id} date={date} bookings={bookingsOnDate}/>
                            );
                        }
                    })}
                </div>
                <p>{active ? "" : "No active bookings"}</p>
                <hr className="booking-hr"/>
                <h1>Expired Bookings:</h1>
                <div className="my-bookings-grid">
                    {Object.entries(bookingData).map((keyValuePair) => {
                        const date = keyValuePair[0];
                        const bookingsOnDate = keyValuePair[1];
                        if (new Date(date.split(' ')[2]) < new Date()) {
                            id++;
                            expired++;
                            return (
                                <MyBooking key={id} id={id} date={date} bookings={bookingsOnDate}/>
                            );
                        }
                    })}
                </div>
                <p></p>
                <hr className="booking-hr"/>
                <div>
                    {expired ?
                        createElement("div", {className: "rating-div"},
                            [createElement(RatingSystem)])
                        : createElement("p", null, "No expired bookings")}
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default MyBookings;