import {useEffect, useState} from "react";
import {getFromAPI} from "../services/api.js";
import Room from "../components/booking/Room.jsx";
import '../css/booking/Booking.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Booking() {
    const defaultStartDate = new Date(new Date().setHours(0, 0, 0, 0));
    const defaultEndDate = new Date(defaultStartDate.getFullYear(), defaultStartDate.getMonth(), defaultStartDate.getDate() + 1);
    const [rooms, setRooms] = useState(null);
    const [bookings, setBookings] = useState(null);
    const [loadingRooms, setLoadingRooms] = useState(true);
    const [loadingBookings, setLoadingBookings] = useState(true);
    const [startDate, setStartDate] = useState(defaultStartDate);
    const [endDate, setEndDate] = useState(defaultEndDate);

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
        if (startDate >= endDate || startDate < defaultStartDate || !rooms || !bookings) return [];

        const filteredRooms = [];
        for (const room of rooms) {
            const {id} = room;
            for (const booking of bookings) {
                const {roomId, start, end} = booking;
                if (Number(id) !== Number(roomId)) {
                    continue;
                }
                if ((new Date(start) <= startDate && new Date(end) <= startDate) || (new Date(start) >= endDate && new Date(end) >= endDate)) {
                    filteredRooms.push(room);
                }
            }
        }
        return filteredRooms;
    }

    return (
        <div className="booking-container">
            <div className="booking-query-container">
                <div className="datepicker-container">
                    <label>Start date: </label>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}
                                showMonthYearDropdown={null}/>
                </div>
                <div className="datepicker-container">
                    <label>End date: </label>
                    <DatePicker selected={endDate} onChange={(date) => setEndDate(date)}
                                showMonthYearDropdown={null}/>
                </div>
            </div>
            <div className="rooms-grid">
                {loadingRooms || loadingBookings
                    ? "Loading..."
                    : filterRooms().map(room => <Room room={room} key={room.id}/>)
                }
            </div>
            <div>
                {!loadingRooms && !loadingBookings && filterRooms().length === 0 ? "No available rooms for this date" : ""}
            </div>
        </div>
    );
}

export default Booking;