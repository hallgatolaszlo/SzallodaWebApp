function Room(roomData) {
    return (
        <div className="room-container">
            <p className="room-name">{roomData.name}</p>
        </div>
    );
}

export default Room;