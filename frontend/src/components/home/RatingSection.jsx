import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import RatingCard from "./RatingCard.jsx";
import {useEffect, useState} from "react";
import {getFromAPI} from "../../services/api.js";
import '../../css/home/RatingSection.css';

function RatingSection() {
    const [ratings, setRatings] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRatings() {
            return await getFromAPI("ratings");
        }

        fetchRatings().then(data => setRatings(data)).then(() => setLoading(false));
    }, []);

    function getRatings() {
        const rates = [];
        let index = 0;
        ratings.sort((a, b) => b.rating - a.rating);
        for (const rate of ratings) {
            if (index < 5) {
                rates.push(rate);
                index++;
            } else {
                break;
            }
        }
        return rates;
    }

    function scrollLeft() {
        document.getElementById("media-scroller").scrollLeft -= document.getElementById("media-item").offsetWidth;
    }

    function scrollRight() {
        document.getElementById("media-scroller").scrollLeft += document.getElementById("media-item").offsetWidth;
    }

    return (
        <div className="section rating-section">
            <div className="media-scroller-container">
                <p onClick={scrollLeft} className="btn" id="btn-left"><FaArrowLeft/></p>
                <div id="media-scroller">
                    {loading ? "Loading..." : getRatings().map(rate => <RatingCard key={rate.id} rate={rate}/>)}
                </div>
                <p onClick={scrollRight} className="btn" id="btn-right"><FaArrowRight/></p>
            </div>
        </div>
    );
}

export default RatingSection;