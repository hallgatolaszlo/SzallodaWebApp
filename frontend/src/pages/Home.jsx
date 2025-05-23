import HomeImage from "../components/home/HomeImage.jsx";
import Footer from "../components/Footer.jsx";
import '../css/home/HomaPage.css';
import RatingCards from "../components/home/RatingCards.jsx";
import {getFromAPI} from "../services/api.js";
import {useEffect, useState} from "react";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";

function Home() {
    const [ratings, setRatings] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRatings() {
            return await getFromAPI("ratings");
        }

        fetchRatings().then(data => setRatings(data)).then(() => setLoading(false));
    }, []);

    function getRatings() {
        const rates = [];
        let index = 0;
        ratings.sort((a, b) => b.rating - a.rating);
        for (const rate of ratings) {
            if (index < 5) {
                rates.push(rate);
                index++;
            } else {
                break;
            }
        }
        return rates;
    }

    function scrollLeft() {
        document.getElementById("media-scroller").scrollLeft -= document.getElementById("media-item").offsetWidth;
    }

    function scrollRight() {
        document.getElementById("media-scroller").scrollLeft += document.getElementById("media-item").offsetWidth;
    }

    return (
        <>
            <HomeImage/>
            <div className="marketing-text">
                <h1>The best hotel in the world</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum
                    mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis
                    dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue
                    enim, ut porta lorem lacinia consectetur.</p>
            </div>

            <div className="media-scroller-container">
                <p onClick={scrollLeft} className="btn" id="btn-left"><FaArrowLeft/></p>
                <div id="media-scroller">
                    {loading ? "Loading..." : getRatings().map(rate => <RatingCards key={rate.id} rate={rate}/>)}
                </div>
                <p onClick={scrollRight} className="btn" id="btn-right"><FaArrowRight/></p>
            </div>

            <Footer/>
        </>
    );
}

export default Home;