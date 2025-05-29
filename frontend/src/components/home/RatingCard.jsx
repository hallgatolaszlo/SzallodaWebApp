import '../../css/home/RatingCard.css';
import {useEffect, useState} from "react";
import {getFromAPI} from "../../services/api.js";

function RatingCard({rate}) {
    const {username, text} = rate;

    const [fiveStarImage, setfiveStarImage] = useState(null);

    useEffect(() => {
        async function fetchImages() {
            return await getFromAPI("images");
        }


        fetchImages().then(data => {
            setfiveStarImage(data.find(image => image.class === "five-star"));
        });
    }, []);

    return (
        <>
            <div id="media-item">
                <p className="rating-card-username">@{username}</p>
                <p className="rating-card-text">“{text}”</p>
                <div className="rating-card-image-container">
                    <img src={fiveStarImage ? fiveStarImage.url : null} alt="5-star" className="rating-image"></img>
                </div>
            </div>
        </>
    );
}

export default RatingCard;