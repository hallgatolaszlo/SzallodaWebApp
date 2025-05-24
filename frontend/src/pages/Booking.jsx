import Room from "../components/booking/Room.jsx";
import '../css/booking/Booking.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useRoomsAndBookingsContext} from "../contexts/RoomsAndBookingsContext.jsx";

function Booking() {
    const {
        availableRooms,
        uniqueRooms,
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        loading,
        allBookingPrices,
    } = useRoomsAndBookingsContext();

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
                    : uniqueRooms.map(room => <Room room={room} key={room.id}/>)
                }
            </div>
            <div>
                {!loading && availableRooms.length === 0 ? "No available rooms for this date" : ""}
            </div>
            <div>
                <p>{"Total:" + allBookingPrices.reduce((acc, cur) => {
                    return acc + cur;
                }, 0)}</p>
            </div>
        </div>
    );
}

export default Booking;