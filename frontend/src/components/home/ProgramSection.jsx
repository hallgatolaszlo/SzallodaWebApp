import '../../css/home/ProgramSection.css';
import {createElement, useEffect, useState} from "react";
import {getFromAPI} from "../../services/api.js";

function ProgramSection() {
    const [programImages, setProgramImages] = useState([]);

    useEffect(() => {
        async function fetchImages() {
            return await getFromAPI("images");
        }


        fetchImages().then(data => {
            setProgramImages(data.filter(image => image.class === "program"));
        });
    }, []);

    const programs = ["Explore the ruins of Atlantis", "Explore the surrounding environment", "Enjoy the harmony of whales and music.", "Study the marine life with experts"];

    return (
        <div className="section program-section">
            {programImages.map(image =>
                createElement("div", {className: "program-container", key: image.id + 300}, [
                    createElement("div", {className: "program-container-img", key: image.id + 100}, <img
                        className="gallery-rooms-images"
                        src={image.url}
                        key={image.id}
                        alt={image.id}
                    />), <h3 className="program-img-text" key={image.id + 200}>{programs.shift()}</h3>])
            )}
        </div>
    );
}

export default ProgramSection;