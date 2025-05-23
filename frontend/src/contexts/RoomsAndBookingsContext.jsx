import {createContext, useState, useContext, useEffect} from "react";
import {getFromAPI} from "../services/api.js";

const RoomsAndBookingsContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useRoomsAndBookingsContext = () => useContext(RoomsAndBookingsContext);

export const RoomsAndBookingsContextProvider = ({children}) => {

    const [rooms, setRooms] = useState(null);
    const [bookings, setBookings] = useState(null);

    const defaultStartDate = new Date(new Date().setHours(0, 0, 0, 0));
    const defaultEndDate = new Date(defaultStartDate.getFullYear(), defaultStartDate.getMonth(), defaultStartDate.getDate() + 1);

    const [startDate, setStartDate] = useState(defaultStartDate);
    const [endDate, setEndDate] = useState(defaultEndDate);
    const [numberOfNights, setNumberOfNights] = useState(1);

    const [loading, setLoading] = useState(true);

    const [availableRooms, setAvailableRooms] = useState(getAvailableRooms());
    const [uniqueRooms, setUniqueRooms] = useState([]);
    const [allBookingPrices, setAllBookingPrices] = useState([]);


    useEffect(() => {
        const uniqueRooms = availableRooms.reduce((acc, obj) => {
            if (!acc.some(item => item.name === obj.name)) {
                acc.push(obj);
            }
            return acc;
        }, []);

        setUniqueRooms(uniqueRooms);
        setAllBookingPrices(new Array(uniqueRooms.length).fill(0));
    }, [availableRooms]);

    useEffect(() => {
        if (rooms && bookings) {
            setLoading(false);
        }
    }, [rooms, bookings]);

    useEffect(() => {
        console.log(allBookingPrices);
    }, [allBookingPrices]);

    useEffect(() => {
        async function fetchRooms() {
            return await getFromAPI("rooms");
        }

        async function fetchBookings() {
            return await getFromAPI("bookings");
        }

        fetchRooms().then(data => setRooms(data));
        fetchBookings().then(data => setBookings(data));
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

    function getAvailableRooms() {
        if (startDate >= endDate || startDate < defaultStartDate || !rooms || !bookings) return [];

        const availableRooms = [];
        for (const room of rooms) {
            const {id} = room;
            const booking = bookings.find(booking => Number(booking["roomId"]) === Number(id));
            if (booking) {
                const {start, end} = booking;
                if ((new Date(start) <= startDate && new Date(end) <= startDate) || (new Date(start) >= endDate && new Date(end) >= endDate)) {
                    availableRooms.push(room);
                }
            } else {
                availableRooms.push(room);
            }
        }
        return availableRooms;
    }

    const value = {
        rooms,
        bookings,
        availableRooms,
        uniqueRooms,
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        loading,
        numberOfNights,
        allBookingPrices,
        setAllBookingPrices
    };

    return <RoomsAndBookingsContext.Provider value={value}>
        {children}
    </RoomsAndBookingsContext.Provider>;
};