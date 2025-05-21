import HomeImage from "../components/home/HomeImage.jsx";
import Footer from "../components/Footer.jsx";
import RatingCards from "../components/home/RatingCards.jsx";
import {getRatingsFromAPI} from "../services/ratingAPI.js";
import {useEffect, useState} from "react";

function Home() {
    const [ratings, setRatings] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRatings() {
            return await getRatingsFromAPI();
        }

        fetchRatings().then(data => setRatings(data)).then(() => setLoading(false));
    }, []);

    function getRatings() {
        const rates = [];
        let index = 0;
        for (const rate of ratings) {
            if (index < 5) {
                rates.push(rate);
                index++;
            } else {
                break;
            }
        }
        rates.sort((a, b) => b.rating - a.rating);
        return rates;
    }


    return (
        <>
            <HomeImage/>

            <main>
                <div className="ratings-grid">
                    {loading ? "Loading..." : getRatings().map(rate => <RatingCards key={rate.id} rate={rate}/>)}

                </div>
            </main>

            <Footer/>
        </>
    );
}

export default Home;