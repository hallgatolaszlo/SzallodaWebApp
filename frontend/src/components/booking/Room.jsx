import "../../css/booking/Room.css";
import {useState, createElement, useEffect} from "react";
import _ from "lodash";
import {useRoomsAndBookingsContext} from "../../contexts/RoomsAndBookingsContext.jsx";

function Room({room, availableRooms}) {
    const {rooms} = useRoomsAndBookingsContext();

    const {name, price, capacity, image} = room;
    const priceChangePerPerson = 0.05;
    const [numberOfRooms, setNumberOfRooms] = useState(0);
    const [guestsPerRoom, setGuestsPerRoom] = useState({});
    const [fullPrice, setFullPrice] = useState(0);

    useEffect(() => {
            const newGuestsPerRoom = {};

            for (let i = 1; i <= numberOfRooms; i++) {
                if ((i) in guestsPerRoom)
                    newGuestsPerRoom[i] = guestsPerRoom[i];
                else {
                    newGuestsPerRoom[i] = 1;
                }
            }

            setGuestsPerRoom(newGuestsPerRoom);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [numberOfRooms]);

    useEffect(() => {
        let newFullPrice = price * numberOfRooms;

        Object.entries(guestsPerRoom).map((keyValuePair) => {
            const guestCount = keyValuePair[1];

            newFullPrice += guestCount > 1 ? (guestCount - 1) * price * priceChangePerPerson : 0;
        });

        setFullPrice(newFullPrice);
    }, [price, numberOfRooms, guestsPerRoom]);

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
                    <span>{"+ $" + new Intl.NumberFormat("US-us").format(numberOfRooms * price)}</span>
                </div>
                <div className="room-guests-per-room-container">
                    <p>{1 in guestsPerRoom ? "Guests per Room:" : ""}</p>
                    {Object.entries(guestsPerRoom).map((keyValuePair) => {
                        const roomNumber = keyValuePair[0];
                        const guestCount = keyValuePair[1];
                        return (
                            <div key={roomNumber} className="room-guests-per-current-room-container">
                                <p>{roomNumber + ". Room: "}</p>
                                <select onChange={(e) => setGuestsPerRoom(prevState => ({
                                    ...prevState,
                                    [roomNumber]: Number(e.target.value)
                                }))}>
                                    {_.range(1, capacity + 1).map(number => createElement("option", {key: number}, number))}
                                </select>
                                <span>{guestCount > 1 ? "+ $" + new Intl.NumberFormat("US-us").format((guestCount - 1) * price * priceChangePerPerson) : ""}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Room;