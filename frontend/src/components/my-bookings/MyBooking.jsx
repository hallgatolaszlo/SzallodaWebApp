import "../../css/my-bookings/MyBooking.css";

function MyBooking({bookingData}) {
    const {room, guest, guestCount, start, end} = bookingData;

    return (
        <div className="my-booking-container">
            <div className="my-booking-guest-details">
                <p>Name: {guest.name}</p>
                <p>Email: {guest.email}</p>
                <p>Phone: {guest.phone}</p>
                <p>Room: {room.name}</p>
                <p>Start: {start}</p>
                <p>End: {end}</p>
                <p>Guests: {guestCount}</p>
                <img src={room.image} alt={room.name}></img>
            </div>
            <div className="my-booking-booking-details"></div>
            <div className="my-booking-room-details"></div>
        </div>
    );
}

export default MyBooking;