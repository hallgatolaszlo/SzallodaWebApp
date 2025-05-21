import {useEffect, useState} from "react";
import {getFromAPI} from "../services/api.js";
import Room from "../components/booking/Room.jsx";
import '../css/booking/Booking.css';

function Booking() {
    const defaultDate = new Date();
    const [rooms, setRooms] = useState(null);
    const [bookings, setBookings] = useState(null);
    const [loadingRooms, setLoadingRooms] = useState(true);
    const [loadingBookings, setLoadingBookings] = useState(true);
    const [startDate, setStartDate] = useState(defaultDate);
    const [endDate, setEndDate] = useState(defaultDate);

    useEffect(() => {
        async function fetchRooms() {
            return await getFromAPI("rooms");
        }

        async function fetchBookings() {
            return await getFromAPI("bookings");
        }

        fetchRooms().then(data => setRooms(data)).then(() => setLoadingRooms(false));
        fetchBookings().then(data => setBookings(data)).then(() => setLoadingBookings(false));
    }, []);

    function filterRooms() {
        const filteredRooms = [];
        for (const room of rooms) {
            for (const booking of bookings) {
                if (Number(room.id) !== Number(booking.roomId)) {
                    continue;
                }
                if ((new Date(booking.startDate) <= startDate && new Date(booking.endDate) <= startDate) || (new Date(booking.startDate) >= endDate && new Date(booking.endDate) >= endDate)) {
                    filteredRooms.push(room);
                }
            }
        }
        return filteredRooms;
    }

    return (
        <div className="booking-container">
            <form>
                <input name="start-date" defaultValue={defaultDate.toISOString().split('T')[0]} type="date"
                       onChange={(e) => setStartDate(new Date(e.target.value))}/>
                <input name="end-date" defaultValue={defaultDate.toISOString().split('T')[0]} type="date"
                       onChange={(e) => setEndDate(new Date(e.target.value))}/>
            </form>
            <div className="rooms-grid">
                {loadingRooms || loadingBookings
                    ? "Loading..."
                    : filterRooms().map(room => <Room room={room} key={room.id}/>)
                }
            </div>
        </div>
    );
}

export default Booking;