import "../../css/booking/Room.css";
import React, {useState} from "react";

function Room({room}) {
    const priceChangePerPerson = 1000;
    const {name, price, capacity, image} = room;
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const fullPrice = price + (numberOfGuests - 1) * priceChangePerPerson;

    let options = [];
    for (let i = 1; i <= capacity; i++) {
        options.push(i.toString());
    }

    return (
        <div className="room-container">
            <div className="room-title-bar">
                <p className="room-name">{name}</p>
                <p className="room-capacity">{"For maximum " + capacity + " people"}</p>
            </div>
            <div className="room-image-container">
                <img className="room-image" src={image} alt={"Picture of " + name}/>
                <p className="room-price">{"$" + new Intl.NumberFormat("US-us").format(fullPrice)}</p>
            </div>
            <div className="room-main">
                <div className="room-number-of-guests-container">
                    <p>{"Number of Guests:"}</p>
                    {options.length > 1 ? <select onChange={(e) => {
                        setNumberOfGuests(Number(e.target.value));
                    }} className="room-number-of-guests-select">
                        {options.map(option => React.createElement("option", {key: option[0]}, option))}
                    </select> : React.createElement("p", {}, "1")}
                </div>
            </div>
        </div>
    );
}

export default Room;