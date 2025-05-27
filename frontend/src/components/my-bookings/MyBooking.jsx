import "../../css/my-bookings/MyBooking.css";
import Collapsible from "react-collapsible";
import {format} from "date-fns";
import {useEffect, useState} from "react";

function MyBooking({bookingData}) {
    const {id, room, guest, guestCount, start, end} = bookingData;

    const [trigger, setTrigger] = useState(null);
    const [contentOuter, setContentOuter] = useState(null);

    useEffect(() => {
        setTrigger(document.querySelectorAll(".Collapsible__trigger")[id - 1]);
        setContentOuter(document.querySelectorAll(".Collapsible__contentOuter")[id - 1]);
    }, [id]);

    function openingAnimation() {
        contentOuter.style.border = "2px solid #A26E20";
        trigger.style.borderBottom = "none";
        trigger.style.borderBottomLeftRadius = "0";
        trigger.style.borderBottomRightRadius = "0";
    }

    function closingAnimation() {
        contentOuter.style.border = "none";
        trigger.style.borderBottom = "2px solid #A26E20";
        trigger.style.borderBottomLeftRadius = "10px";
        trigger.style.borderBottomRightRadius = "10px";
    }

    return (<Collapsible
            easing="ease-in-out"
            onOpening={openingAnimation}
            onClose={closingAnimation}
            className="my-booking-collapsible-closed"
            openedClassName="my-booking-collapsible-opened"
            triggerClassName="my-booking-collapsible-trigger-closed"
            triggerOpenedClassName="my-booking-collapsible-trigger-opened"
            trigger={format(start, "yyyy/MM/dd") + " - " + format(end, "yyyy/MM/dd")}
            contentOuterClassName="my-booking-collapsible-content-outer">
            <div className="my-booking-container">
                <div className="my-booking-room-details">
                    <p>Room: {room.name}</p>
                    <img src={room.image} alt={room.name}></img>
                    <p>Guests: {guestCount}</p>
                </div>
                <div className="my-booking-guest-details">
                    <p>Name: {guest.name}</p>
                    <p>Email: {guest.email}</p>
                    <p>Phone: {guest.phone}</p>
                </div>
            </div>
        </Collapsible>
    );
}

export default MyBooking;