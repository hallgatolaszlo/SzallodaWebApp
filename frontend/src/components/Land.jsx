import atlantis from '../img/atlantis.jpg';
import '../css/Land.css';

function Land() {
    return (
        <>
            <div className="land-image">
                <img src={atlantis} alt="Atlantis"/>
            </div>
        </>
    );
}

export default Land;