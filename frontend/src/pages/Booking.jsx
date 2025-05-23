import {useEffect, useState} from "react";
import Room from "../components/booking/Room.jsx";
import '../css/booking/Booking.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useRoomsAndBookingsContext} from "../contexts/RoomsAndBookingsContext.jsx";

function Booking() {
    const {rooms, bookings, getAvailableRooms} = useRoomsAndBookingsContext();

    const defaultStartDate = new Date(new Date().setHours(0, 0, 0, 0));
    const defaultEndDate = new Date(defaultStartDate.getFullYear(), defaultStartDate.getMonth(), defaultStartDate.getDate() + 1);

    const [startDate, setStartDate] = useState(defaultStartDate);
    const [endDate, setEndDate] = useState(defaultEndDate);

    const [availableRooms, setAvailableRooms] = useState(getAvailableRooms(startDate, endDate));

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (rooms && bookings) {
            setLoading(false);
        }
    }, [rooms, bookings]);

    useEffect(() => {
        setAvailableRooms(getAvailableRooms(startDate, endDate));
    }, [startDate, endDate, getAvailableRooms]);

    const uniqueRooms = availableRooms.reduce((acc, obj) => {
        if (!acc.some(item => item.name === obj.name)) {
            acc.push(obj);
        }
        return acc;
    }, []);

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
                {loading
                    ? "Loading..."
                    : uniqueRooms.map(room => <Room room={room}
                                                    availableRooms={availableRooms}
                                                    key={room.id}/>)
                }
            </div>
            <div>
                {!loading && availableRooms.length === 0 ? "No available rooms for this date" : ""}
            </div>
        </div>
    );
}

export default Booking;