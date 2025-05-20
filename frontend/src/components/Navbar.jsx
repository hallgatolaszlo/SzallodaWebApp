import {Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {FaBars, FaTimes, FaRegUserCircle, FaHotel} from "react-icons/fa";
import '../css/Navbar.css';


function Navbar() {
    /*navbar responsivity*/
    const navRef = useRef();
    const [isNavVisible, setIsNavVisible] = useState(false);

    const showBar = () => {
        setIsNavVisible(!isNavVisible);
        navRef.current.classList.toggle("show-nav");
    };

    /*header fading*/
    const headerRef = useRef();
    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = () => {
        const currentScrollPos = window.scrollY;

        if (currentScrollPos > 100) {
            setIsScrolled(true);
            headerRef.current.classList.add("change-background");
        } else {
            setIsScrolled(false);
            headerRef.current.classList.remove("change-background");
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isScrolled]);

    return (
        <header ref={headerRef}>
            <div className="navbar-brand flexbox-item">
                <div>
                    <FaHotel className="hotel-icon"/>
                    <h1>Hotel Atlantis</h1>
                </div>

                <button onClick={showBar} className="nav-btn nav-btn-open">
                    <FaBars/>
                </button>
            </div>
            <nav className="navbar flexbox-item" ref={navRef}>
                <div className="navbar-links">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/booking" className="nav-link">Booking</Link>
                    {isNavVisible === true ?
                        (<div className="nav-link-log-group">
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/login" className="nav-link">Sign Up</Link>
                        </div>) : (
                            <div className="nav-link dropdown">
                                <button className="nav-link-btn">
                                    <FaRegUserCircle className="nav-link-icon"/>
                                </button>
                                <div className="dropdown-content">
                                    <Link to="/login" className="nav-link">Login</Link>
                                    <Link to="/login" className="nav-link">Sign Up</Link>
                                </div>
                            </div>)}
                </div>
                <button onClick={showBar} className="nav-btn nav-btn-close">
                    <FaTimes/>
                </button>
            </nav>
        </header>
    );
}

export default Navbar;