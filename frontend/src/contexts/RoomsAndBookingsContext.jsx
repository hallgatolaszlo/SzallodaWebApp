import {createContext, useState, useContext, useEffect} from "react";
import {getFromAPI} from "../services/api.js";

const RoomsAndBookingsContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useRoomsAndBookingsContext = () => useContext(RoomsAndBookingsContext);

export const RoomsAndBookingsContextProvider = ({children}) => {

    const [rooms, setRooms] = useState(null);
    const [bookings, setBookings] = useState(null);

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

    function getAvailableRooms(startDate, endDate) {
        const defaultStartDate = new Date(new Date().setHours(0, 0, 0, 0));
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
        getAvailableRooms
    };

    return <RoomsAndBookingsContext.Provider value={value}>
        {children}
    </RoomsAndBookingsContext.Provider>;
};