function RatingCards({rate}) {
    const {username, text} = rate;

    return (
        <>
            <div className="rating-card-container">
                <div className="rating-card">
                    <p>{username}</p>
                    <p>“{text}”</p>
                </div>
            </div>
        </>
    );
}

export default RatingCards;