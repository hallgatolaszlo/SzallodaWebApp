import "../../css/my-bookings/RatingSystem.css";
import {useRef, useState} from "react";
import {postRating} from "../../services/api.js";

function RatingSystem() {
    const ratingRef = useRef(null);
    const ratingTextRef = useRef(null);
    const [rating, setRating] = useState(0);

    //const [formData, setFormData] = useState({});

    const handleFormSubmit = () => {

        postRating(JSON.parse(sessionStorage.getItem("accountData")).accountId, JSON.parse(sessionStorage.getItem("accountData")).username, rating, ratingTextRef.current.value)
            .then((data) => {
                console.log(data);
                alert("Your rating has been saved!, Thank you!");
            }).catch(error => {
            alert(error);
        });
    };

    function handleRatingChange() {
        setRating(ratingRef.current.value);
        ratingRef.current.style.setProperty("--val", `${ratingRef.current.value}`);
    }


    return (
        <>
            <form className="rating-form" onSubmit={handleFormSubmit}>
                <h3 className="leave-review-text">Leave a review!</h3>
                <div className="star-container">
                    <input ref={ratingRef} type="range" min="0" max="5" step="0.5" value="0" className="star-rating"
                           onInput={() => {
                               handleRatingChange();
                           }}
                           required/>
                    <p className="current-rating">Rating: {rating}/5</p>
                </div>
                <textarea ref={ratingTextRef} placeholder="Enter your review" required className="rating-text"
                          rows={10}/>
                <button type="submit" className="rating-submit-button">Submit</button>
            </form>
        </>
    );
}

export default RatingSystem;