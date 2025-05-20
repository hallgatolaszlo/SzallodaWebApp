import {useEffect, useState} from "react";
import {getFromAPI} from "../services/api.js";
import Room from "../components/Room.jsx";

function Booking() {
    const [rooms, setRooms] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRooms() {
            return await getFromAPI("rooms");
        }

        fetchRooms().then(data => setRooms(data)).then(() => setLoading(false));
    }, []);

    return (
        <div>
            <div className="rooms-grid">
                {loading ? "" : rooms.map((room) =>
                    <Room roomData={room} key={room.id}/>
                )}
            </div>
        </div>
    );
}

export default Booking;