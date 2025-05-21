import "../../css/booking/Room.css";

function Room({room}) {
    const {name, price, capacity, image} = room;
    return (
        <div className="room-container">
            <div className="room-title-bar">
                <p className="room-name">{name}</p>
                <p className="room-capacity">{"For maximum " + capacity + " people"}</p>
            </div>
            <img className="room-image" src={image} alt={"Picture of " + name}/>
            <div className="room-main">
                <p className="room-price">{"Price: " + price}</p>
            </div>
        </div>
    );
}

export default Room;