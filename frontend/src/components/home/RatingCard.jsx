import '../../css/home/RatingCard.css';

function RatingCard({rate}) {
    const {username, text} = rate;

    return (
        <>
            <div id="media-item">
                <p>{username}</p>
                <p>“{text}”</p>
            </div>
        </>
    );
}

export default RatingCard;