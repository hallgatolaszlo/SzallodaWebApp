import "../../css/booking/Room.css";
import {useState, createElement, useEffect} from "react";
import _ from "lodash";
import {useRoomsAndBookingsContext} from "../../contexts/RoomsAndBookingsContext.jsx";

function Room({room, availableRooms}) {
    const {rooms} = useRoomsAndBookingsContext();

    const {name, price, capacity, image} = room;
    const [numberOfRooms, setNumberOfRooms] = useState(0);
    const [fullPrice, setFullPrice] = useState(0);

    useEffect(() => {
        setFullPrice(price * numberOfRooms);
    }, [price, numberOfRooms]);

    const allOfThisType = rooms.filter(room => room.name === name);
    const availableOfThisType = availableRooms.filter(room => room.name === name);

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
                <div className="room-number-of-rooms-container">
                    <p>{"Number of Rooms: "}</p>
                    <select className="room-number-of-rooms-select"
                            onChange={(e) => setNumberOfRooms(Number(e.target.value))}>
                        {_.range(0, allOfThisType.length + 1).map(number => number > availableOfThisType.length
                            ?
                            createElement("option", {
                                key: number,
                                disabled: true,
                            }, number)
                            :
                            createElement("option", {
                                key: number,
                            }, number))}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Room;