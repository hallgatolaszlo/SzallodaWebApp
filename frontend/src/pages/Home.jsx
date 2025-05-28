import HomeImage from "../components/home/HomeImage.jsx";
import Footer from "../components/Footer.jsx";
import MarketingSection from "../components/home/MarketingSection.jsx";
import RatingSection from "../components/home/RatingSection.jsx";
import BookingSection from "../components/home/BookingSection.jsx";
import ProgramSection from "../components/home/ProgramSection.jsx";
import '../css/home/Home.css';

function Home() {
    return (
        <>
            <HomeImage/>

            <div className="fade-in">
                <MarketingSection/>
                <ProgramSection/>
                <BookingSection/>
                <RatingSection/>


            </div>

            <Footer/>
        </>
    );
}

export default Home;


/* Map:
<iframe
    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4187.985042606392!2d-24.2584722!3d31.254305600000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzHCsDE1JzE1LjUiTiAyNMKwMTUnMzAuNSJX!5e1!3m2!1sen!2shu!4v1748347450718!5m2!1sen!2shu"
    width="600" height="450" allowFullScreen="" loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"></iframe>
    */