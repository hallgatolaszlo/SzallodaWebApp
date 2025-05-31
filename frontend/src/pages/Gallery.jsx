import Images from '../components/gallery/Images.jsx';
import '../css/gallery/Gallery.css';
import Footer from "../components/Footer.jsx";


function Gallery() {
    return (
        <>
            <div className="gallery-images-container">
                <Images/>
            </div>
            <Footer/>
        </>
    );
}

export default Gallery;