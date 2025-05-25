import Room from "../components/booking/Room.jsx";
import '../css/booking/Booking.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useRoomsAndBookingsContext} from "../contexts/RoomsAndBookingsContext.jsx";
import ContactDetails from "../components/booking/ContactDetails.jsx";
import {useLoginContext} from "../contexts/LoginContext.jsx";
import {forwardRef, useState} from "react";
import {addDays} from "date-fns";
import Footer from "../components/Footer.jsx";

function Booking() {
    const {isLoggedIn} = useLoginContext();

    const [hoverDate, setHoverDate] = useState(null);

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

    const DatePickerCustomInput = forwardRef(
        ({value, onClick, className}, ref) => (
            <button className={className} onClick={onClick} ref={ref}>
                {value}
            </button>
        ),
    );

    // noinspection JSValidateTypes
    return (
        <>
            <div className="booking-container">
                <div className="booking-query-container">
                    <div className="datepicker-container">
                        <label>Start date</label>
                        <DatePicker
                            className="datepicker-component"
                            showMonthYearDropdown={null}
                            dateFormat="yyyy/MM/dd"
                            calendarStartDay={1}
                            minDate={new Date()}
                            selected={startDate}
                            startDate={startDate}
                            endDate={endDate}
                            selectsStart
                            onChange={(date) => setStartDate(date)}
                            customInput={<DatePickerCustomInput className="datepicker-custom-input"/>}
                            onDayMouseEnter={(date) => setHoverDate(date)}
                            dayClassName={(date) => {
                                if (endDate && date >= startDate && date <= endDate) {
                                    return "react-datepicker__day--in-range";
                                }
                                if (date === hoverDate) {
                                    return "react-datepicker__day--keyboard-selected";
                                }
                                return "";
                            }}
                        />

                    </div>
                    <div className="datepicker-container">
                        <label>End date</label>
                        <DatePicker
                            className="datepicker-component"
                            showMonthYearDropdown={null}
                            dateFormat="yyyy/MM/dd"
                            calendarStartDay={1}
                            minDate={new Date(addDays(startDate, 1))}
                            selected={endDate}
                            startDate={startDate}
                            endDate={endDate}
                            selectsEnd
                            onChange={(date) => setEndDate(date)}
                            customInput={<DatePickerCustomInput className="datepicker-custom-input"/>}
                            onDayMouseEnter={(date) => setHoverDate(date)}
                            dayClassName={(date) => {
                                if (startDate && date >= startDate && date <= endDate) {
                                    return "react-datepicker__day--in-range";
                                }
                                if (date === hoverDate && date > endDate) {
                                    return "react-datepicker__day--keyboard-selected";
                                }
                                if (
                                    startDate &&
                                    date > endDate &&
                                    date <= hoverDate
                                ) {
                                    return "react-datepicker__day--in-preview-range";
                                }
                                return "";
                            }}
                        />

                    </div>
                </div>
                <div className="rooms-grid">
                    {loading ? "Loading..." : availableRooms.length === 0 ? "No available rooms for this date" : uniqueRooms.map(room =>
                        <Room room={room} key={room.id}/>)
                    }
                </div>
                <div>
                    <p className="booking-total-cost">
                        {!loading ? "Total cost: $" + new Intl.NumberFormat("en-US").format(totalCost) + "" : ""}
                    </p>
                </div>
                <hr className="booking-hr"/>
                <div>
                    {isLoggedIn ? <ContactDetails/> :
                        <p className="booking-login-warning">Please log in to book a room</p>}
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Booking;