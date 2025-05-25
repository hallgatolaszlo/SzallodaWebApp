import HomeImage from "../components/home/HomeImage.jsx";
import Footer from "../components/Footer.jsx";
import MarketingSection from "../components/home/MarketingSection.jsx";
import RatingSection from "../components/home/RatingSection.jsx";

function Home() {
    return (
        <>
            <HomeImage/>

            <div className="fade-in">
                <MarketingSection/>
                <RatingSection/>
            </div>

            <Footer/>
        </>
    );
}

export default Home;