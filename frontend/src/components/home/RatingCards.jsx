import '../../css/home/RatingCard.css';

function RatingCards({rate}) {
    const {username, text} = rate;

    return (
        <>
            <div className="media-item">
                <p>{username}</p>
                <p>“{text}”</p>
            </div>
        </>
    );
}

export default RatingCards;