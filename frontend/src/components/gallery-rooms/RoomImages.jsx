import '../../css/gallery-rooms/RoomImages.css';
import {getFromAPI} from "../../services/api.js";
import {useEffect, useState} from "react";

function RoomImages({}) {
    const [roomImages, setRoomImages] = useState([]);

    useEffect(() => {
        async function fetchImages() {
            return await getFromAPI("images");
        }


        fetchImages().then(data => setRoomImages(data));
    }, []);


    return (
        <div className="gallery-rooms-images-container">
            <div className="gallery-rooms-images-images">

                {roomImages
                    .filter(image => image.class === "room")
                    .map(image => (
                        <img
                            className="gallery-rooms-images-images-inside"
                            key={image.id}
                            src={image.url}
                            alt={image.id}
                        />
                    ))}

            </div>
        </div>
    )
}

export default RoomImages;