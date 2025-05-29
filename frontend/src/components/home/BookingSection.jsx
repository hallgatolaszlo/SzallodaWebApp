import '../../css/home/BookingSection.css';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {getFromAPI} from "../../services/api.js";

function BookingSection() {
    const [marketingImage, setMarketingImage] = useState(null);

    useEffect(() => {
        async function fetchImages() {
            return await getFromAPI("images");
        }


        fetchImages().then(data => {
            setMarketingImage(data.find(image => image.class === "marketingimage"));
        });
    }, []);

    return (
        <div className="section booking-section">
            <div className="booking-section-img-container">
                <img src={marketingImage ? marketingImage.url : null} alt="Lobby"/>
            </div>
            <div className="booking-section-text-container">
                <h3>A Submerged Sanctuary Beneath the Atlantic</h3>
                <p>Descend into the extraordinary at Hotel Atlantis, a hidden sanctuary nestled deep beneath the surface
                    of
                    the Atlantic Ocean - where silence is golden, and the sea reveals its most intimate wonders.
                </p>
                <p>
                    Surrounded by shimmering marine life and the ethereal glow of ocean light, Hotel Atlantis offers an
                    immersive experience of luxury and tranquility. Indulge in world-class dining, rejuvenating
                    underwater
                    wellness rituals, and breathtaking panoramic views of the deep. More than a destination, it’s a
                    journey
                    into a world where time slows, and nature whispers in every current.
                </p>
                <Link to="/booking" className="home-booking-button">Book now</Link>
            </div>
        </div>
    );
}

export default BookingSection;