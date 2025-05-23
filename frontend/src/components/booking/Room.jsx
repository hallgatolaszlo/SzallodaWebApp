import "../../css/booking/Room.css";
import {useState, createElement, useEffect} from "react";
import _ from "lodash";
import {useRoomsAndBookingsContext} from "../../contexts/RoomsAndBookingsContext.jsx";

function Room({room}) {
    const {
        rooms,
        availableRooms,
        uniqueRooms,
        setAllBookingPrices,
        numberOfNights
    } = useRoomsAndBookingsContext();

    const {name, price, capacity, image} = room;
    const priceChangePerPerson = 0.05;
    const [numberOfRooms, setNumberOfRooms] = useState(0);
    const [guestsPerRoom, setGuestsPerRoom] = useState({});
    const [pricePerNight, setPricePerNight] = useState(0);
    const [fullPrice, setFullPrice] = useState(0);

    useEffect(() => {
            const newGuestsPerRoom = {};

            for (let i = 1; i <= numberOfRooms; i++) {
                if (i in guestsPerRoom)
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
        let newPrice = price * numberOfRooms;

        Object.entries(guestsPerRoom).map((keyValuePair) => {
            const guestCount = keyValuePair[1];

            newPrice += guestCount > 1 ? (guestCount - 1) * price * priceChangePerPerson : 0;
        });

        setPricePerNight(newPrice);

        newPrice *= numberOfNights;

        setFullPrice(newPrice);

        let index = -1;

        for (let i = 0; i < uniqueRooms.length; i++) {
            if (uniqueRooms[i].name === name) {
                index = i;
            }
        }

        setAllBookingPrices((prev) => {
            const newArray = [...prev];
            for (let i = 0; i < newArray.length; i++) {
                if (i === index) {
                    newArray[i] = newPrice;
                }
            }
            return newArray;
        });

    }, [price, numberOfRooms, guestsPerRoom, numberOfNights, uniqueRooms, name, setAllBookingPrices]);

    const allOfThisType = rooms.filter(room => room.name === name);
    const availableOfThisType = availableRooms.filter(room => room.name === name);

    return (
        <div className="room-container">
            <div className="room-title-bar">
                <p className="room-name">{name}</p>
                <p className="room-capacity">{capacity > 1 ? "For maximum " + capacity + " people" : "For maximum " + capacity + " person"}</p>
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
                    {numberOfRooms === 0 ? "" :
                        <span>{"+ $" + new Intl.NumberFormat("US-us").format(numberOfRooms * price)}</span>}
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
                {numberOfRooms === 0 ? ""
                    :
                    <div className="room-total-price-container">
                        <p>{"Price per night: $" + new Intl.NumberFormat("US-us").format(pricePerNight)}</p>
                        <p>{"For " + (numberOfNights + 1) + " days / " + numberOfNights + " night(s)"}</p>
                    </div>
                }
            </div>
        </div>
    );
}

export default Room;