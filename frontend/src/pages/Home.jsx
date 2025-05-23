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


    return (
        <>
            <HomeImage/>

            <main>
                <div className="media-scroller snaps-inline">
                    {loading ? "Loading..." : getRatings().map(rate => <RatingCards key={rate.id} rate={rate}/>)}
                    <p className="btn-left btn"><FaArrowLeft/></p>
                    <p className="btn-right btn"><FaArrowRight/></p>
                </div>
            </main>

            <Footer/>
        </>
    );
}

export default Home;