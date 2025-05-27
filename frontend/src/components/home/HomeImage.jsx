import atlantis from '../../../public/home/atlantis.jpg';
import '../../css/home/HomeImage.css';

function HomeImage() {
    return (
        <>
            <div className="land-image-container">
                <img src={atlantis} alt="Atlantis" className="land-image"/>
                <div className="image-text-container">
                    <h2 className="image-text">Explore the charming underwater environment</h2>
                </div>
            </div>
        </>
    );
}

export default HomeImage;