import '../../css/home/RatingCard.css';

function RatingCard({rate}) {
    const {username, text} = rate;

    return (
        <>
            <div id="media-item">
                <p className="rating-card-username">@{username}</p>
                <p className="rating-card-text">“{text}”</p>
                <div className="rating-card-image-container">
                    <img src="../../../public/home/five-star.png" alt="5-star" className="rating-image"></img>
                </div>
            </div>
        </>
    );
}

export default RatingCard;