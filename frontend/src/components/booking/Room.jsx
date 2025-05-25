import "../../css/booking/Room.css";
import {useState, useEffect} from "react";
import _ from "lodash";
import {useRoomsAndBookingsContext} from "../../contexts/RoomsAndBookingsContext.jsx";
import {format} from "date-fns";

function Room({room}) {
    const {
        rooms,
        availableRooms,
        startDate,
        endDate,
        uniqueRooms,
        numberOfNights,
        selectedBookings,
        setSelectedBookings,
    } = useRoomsAndBookingsContext();

    const {name, price, capacity, image} = room;
    const priceChangePerPerson = 0.05;
    const [numberOfRooms, setNumberOfRooms] = useState(0);
    const [guestsPerRoom, setGuestsPerRoom] = useState({});
    const [pricePerNight, setPricePerNight] = useState(0);
    const [fullPrice, setFullPrice] = useState(0);

    const allOfThisType = rooms.filter(room => room.name === name);
    const [availableOfThisType, setAvailableOfThisType] = useState([]);

    useEffect(() => {
        setAvailableOfThisType(availableRooms.filter(room => room.name === name));
    }, [availableRooms]);

    useEffect(() => {
        if (selectedBookings[name] === undefined) return;

        setSelectedBookings(prev => {
            const prevSelectedBookings = {...prev};

            while (prevSelectedBookings[name].length > numberOfRooms) {
                prevSelectedBookings[name].pop();
            }

            const startDateLocaleString = startDate.getFullYear() + "-" + (startDate.getMonth() + 1).toString().padStart(2, "0") + "-" + startDate.getDate();
            const endDateLocaleString = endDate.getFullYear() + "-" + (endDate.getMonth() + 1).toString().padStart(2, "0") + "-" + endDate.getDate();

            for (let i = 0; i < numberOfRooms; i++) {
                if (prevSelectedBookings[name][i]) {
                    prevSelectedBookings[name][i]["guestCount"] = guestsPerRoom[i + 1];
                    prevSelectedBookings[name][i]["start"] = startDateLocaleString;
                    prevSelectedBookings[name][i]["end"] = endDateLocaleString;
                    prevSelectedBookings[name][i]["cost"] = price + (guestsPerRoom[i + 1] - 1) * price * priceChangePerPerson;
                } else {
                    prevSelectedBookings[name].push({
                        "roomId": availableOfThisType[i].id,
                        "guestCount": guestsPerRoom[i + 1],
                        "start": startDateLocaleString,
                        "end": endDateLocaleString,
                        "cost": price + (guestsPerRoom[i + 1] - 1) * price * priceChangePerPerson
                    });
                }
            }
            return prevSelectedBookings;
        });
    }, [numberOfRooms, guestsPerRoom, startDate, endDate, availableOfThisType, name]);

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
    }, [price, numberOfRooms, guestsPerRoom, numberOfNights, uniqueRooms, name]);

    return (
        <div className="room-container">
            <div className="room-title-bar">
                <p className="room-name">{name}</p>
                <p className="room-capacity">{capacity > 1 ? "For maximum " + capacity + " people" : "For maximum " + capacity + " person"}</p>
            </div>
            <div className="room-image-container">
                <img className="room-image" src={image} alt={"Picture of " + name}/>
            </div>
            <div className="room-main">
                <div className="room-number-of-rooms-container">
                    <p>{"Number of Rooms: "}</p>
                    <select className="room-number-of-rooms-select"
                            onChange={(e) => setNumberOfRooms(Number(e.target.value))}>
                        {_.range(0, allOfThisType.length + 1).map(number => number > availableOfThisType.length
                            ?
                            <option key={number} disabled>{number}</option>
                            :
                            <option key={number}>{number}</option>)}
                    </select>
                    {numberOfRooms === 0 ? "" :
                        <span>{"+ $" + new Intl.NumberFormat("en-US").format(numberOfRooms * price)}</span>}
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
                                    {_.range(1, capacity + 1).map(number => <option key={number}>{number}</option>)}
                                </select>
                                <span>{guestCount > 1 ? "+ $" + new Intl.NumberFormat("en-US").format((guestCount - 1) * price * priceChangePerPerson) : ""}</span>
                            </div>
                        );
                    })}
                </div>
                {numberOfRooms === 0 ? ""
                    :
                    <div className="room-price-per-night-container">
                        <p>{"Price per night: $" + new Intl.NumberFormat("en-US").format(pricePerNight)}</p>
                        <p>{"For " + (numberOfNights + 1) + " days / " + numberOfNights + " night(s)"}</p>
                        <p>{"From: " + format(startDate, "yyyy/MM/dd") + " - Until: " + format(endDate, "yyyy/MM/dd")}</p>
                    </div>
                }
                <div className="room-price-container">
                    <p className="room-price">{"$" + new Intl.NumberFormat("en-US").format(fullPrice)}</p>
                </div>
            </div>
        </div>
    );
}

export default Room;