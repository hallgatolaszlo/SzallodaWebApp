import Room from "../components/booking/Room.jsx";
import '../css/booking/Booking.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useRoomsAndBookingsContext} from "../contexts/RoomsAndBookingsContext.jsx";
import ContactDetails from "../components/booking/ContactDetails.jsx";
import {useLoginContext} from "../contexts/LoginContext.jsx";

function Booking() {
    const {isLoggedIn} = useLoginContext();

    const {
        availableRooms,
        uniqueRooms,
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        loading,
        totalCost
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
                {loading ? "Loading..." : availableRooms.length === 0 ? "No available rooms for this date" : uniqueRooms.map(room =>
                    <Room room={room} key={room.id}/>)
                }
            </div>
            <div>
                <p>
                    {!loading ? "Total cost: $" + new Intl.NumberFormat("US-us").format(totalCost) + "" : ""}
                </p>
            </div>
            <div>
                {isLoggedIn ? <ContactDetails/> : <p>Please log in to book a room</p>}
            </div>
        </div>
    );
}

export default Booking;