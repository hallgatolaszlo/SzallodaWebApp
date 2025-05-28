import {createContext, useState, useContext, useEffect} from "react";
import {getFromAPI} from "../services/api.js";
import {addDays} from "date-fns";

const RoomsAndBookingsContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useRoomsAndBookingsContext = () => useContext(RoomsAndBookingsContext);

export const RoomsAndBookingsContextProvider = ({children}) => {

    const [rooms, setRooms] = useState(null);
    const [bookings, setBookings] = useState(null);
    const [guests, setGuests] = useState(null);

    const defaultStartDate = new Date(new Date().setHours(0, 0, 0, 0));
    const defaultEndDate = new Date(addDays(defaultStartDate, 1));

    const [startDate, setStartDate] = useState(defaultStartDate);
    const [endDate, setEndDate] = useState(defaultEndDate);
    const [numberOfNights, setNumberOfNights] = useState(1);

    const [loading, setLoading] = useState(true);

    const [availableRooms, setAvailableRooms] = useState(getAvailableRooms());
    const [uniqueRooms, setUniqueRooms] = useState([]);

    const [selectedBookings, setSelectedBookings] = useState({});
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
            setTotalCost(getTotalCost());
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [selectedBookings]);

    useEffect(() => {
        setSelectedBookings(prev => {
            const prevSelectedBookings = {...prev};
            const newSelectedBookings = {};
            for (const room of uniqueRooms) {
                if (room.name in prevSelectedBookings) {
                    newSelectedBookings[room.name] = prevSelectedBookings[room.name];
                } else {
                    newSelectedBookings[room.name] = [];
                }
            }
            return newSelectedBookings;
        });
    }, [startDate, endDate, uniqueRooms]);

    useEffect(() => {
        const uniqueRooms = availableRooms.reduce((acc, obj) => {
            if (!acc.some(item => item.name === obj.name)) {
                acc.push(obj);
            }
            return acc;
        }, []);

        setUniqueRooms(uniqueRooms);
    }, [availableRooms]);

    useEffect(() => {
        if (rooms && bookings) {
            setLoading(false);
        }
    }, [rooms, bookings]);

    useEffect(() => {
        async function fetchRooms() {
            return await getFromAPI("rooms");
        }

        async function fetchBookings() {
            return await getFromAPI("bookings");
        }

        async function fetchGuests() {
            return await getFromAPI("guests");
        }

        fetchRooms().then(data => setRooms(data));
        fetchBookings().then(data => setBookings(data));
        fetchGuests().then(data => setGuests(data));
    }, []);

    useEffect(() => {
            setAvailableRooms(getAvailableRooms());
            setNumberOfNights(getNumberOfNights());
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [startDate, endDate, loading]);

    function getNumberOfNights() {
        const diffTime = Math.abs(endDate - startDate);
        return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    }

    window.onclick = () => {
        console.log();
    };

    function getAvailableRooms() {
        if (startDate >= endDate || startDate < defaultStartDate || !rooms || !bookings) return [];

        const availableRooms = [];
        for (const room of rooms) {
            const {id} = room;
            const bookingsOfRoomId = bookings.filter(booking => booking["roomId"].toString() === id.toString());
            if (bookingsOfRoomId.length !== 0) {
                if (bookingsOfRoomId.every(booking => {
                    let {start, end} = booking;
                    start = new Date(new Date(start).setHours(0, 0, 0, 0));
                    end = new Date(new Date(end).setHours(0, 0, 0, 0));
                    return (start < startDate && end <= startDate) || (start >= endDate && end > endDate);
                })) {
                    availableRooms.push(room);
                }
            } else {
                availableRooms.push(room);
            }
        }
        return availableRooms;
    }

    function getTotalCost() {
        let totalPrice = 0;
        Object.values(selectedBookings).forEach(type => type.forEach(booking => {
            totalPrice += booking.cost;
        }));
        totalPrice *= numberOfNights;
        return totalPrice;
    }

    const value = {
        rooms,
        bookings,
        guests,
        availableRooms,
        uniqueRooms,
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        loading,
        numberOfNights,
        selectedBookings,
        setSelectedBookings,
        totalCost
    };

    return <RoomsAndBookingsContext.Provider value={value}>
        {children}
    </RoomsAndBookingsContext.Provider>;
};