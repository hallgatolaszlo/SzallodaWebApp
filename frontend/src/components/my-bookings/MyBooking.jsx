import "../../css/my-bookings/MyBooking.css";
import Collapsible from "react-collapsible";
import {useEffect, useState} from "react";

function MyBooking({id, date, bookings}) {

    const [trigger, setTrigger] = useState(null);
    const [contentOuter, setContentOuter] = useState(null);

    useEffect(() => {
        setTrigger(document.querySelectorAll(".Collapsible__trigger")[id]);
        setContentOuter(document.querySelectorAll(".Collapsible__contentOuter")[id]);
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

    let key = -1;

    return (<Collapsible
            easing="ease-in-out"
            onOpening={openingAnimation}
            onClose={closingAnimation}
            className="my-booking-collapsible-closed"
            openedClassName="my-booking-collapsible-opened"
            triggerClassName="my-booking-collapsible-trigger-closed"
            triggerOpenedClassName="my-booking-collapsible-trigger-opened"
            trigger={date}
            contentOuterClassName="my-booking-collapsible-content-outer">
            {bookings.map((current) => {
                key++;
                return (
                    <div key={key} className="my-booking-container">
                        <p className="my-booking-room-name">{current.room.name}</p>
                        <img className="my-booking-img" alt={current.room.name} src={current.room.image}></img>
                        <div className="my-booking-main">
                            <p className="my-booking-number-of-guests"># of Guests: {current.booking.guestCount}</p>
                            <p className="my-booking-cost">Cost:
                                ${new Intl.NumberFormat("en-US").format(current.booking.cost)}</p>
                        </div>
                    </div>
                );
            })}
            <p className="my-booking-total-cost">Total Cost:
                ${new Intl.NumberFormat("en-US").format(bookings.reduce((acc, cur) => {
                    return acc + Number(cur.booking.cost);
                }, 0))}</p>
        </Collapsible>
    );
}

export default MyBooking;