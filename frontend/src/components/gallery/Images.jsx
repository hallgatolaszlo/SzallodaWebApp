import '../../css/gallery/Images.css'
import {useNavigate} from 'react-router-dom';

function Images() {
    const navigate = useNavigate();

    return (
        <div className="gallery-page-buttons-container">
            <div className="gallery-page-inside-button"
                 onClick={() => navigate("/gallery-rooms")}>
                Rooms
            </div>
            <div className="gallery-page-bar-button"
                 onClick={() => navigate("/gallery-lobbies")}>
                Lobby
            </div>
        </div>
    )
}

export default Images