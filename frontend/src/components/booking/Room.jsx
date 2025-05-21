import "../../css/booking/Room.css";

function Room({room, startDate, endDate}) {
    const {name, price, capacity, image} = room;
    return (
        <div className="room-container">
            <div className="room-title-bar">
                <p className="room-name">{name}</p>
                <p className="room-capacity">{"For maximum " + capacity + " people"}</p>
            </div>
            <div className="room-image-container">
                <img className="room-image" src={image} alt={"Picture of " + name}/>
            </div>
            <div className="room-main">
                <p className="room-date">{"Date: " + startDate.toLocaleDateString() + " - " + endDate.toLocaleDateString()}</p>
                <p className="room-price">{"Price: €" + new Intl.NumberFormat("EU-eu").format(price)}</p>
            </div>
        </div>
    );
}

export default Room;