import {Link} from "react-router-dom";
import {createElement, useEffect, useRef, useState} from "react";
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
    const logoRef = useRef();
    const headerRef = useRef();
    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = () => {
        const currentScrollPos = window.scrollY;

        if (currentScrollPos > 50) {
            setIsScrolled(true);
            headerRef.current.classList.add("change-background");
            logoRef.current.classList.add("logo-disappear");
        } else {
            setIsScrolled(false);
            headerRef.current.classList.remove("change-background");
            logoRef.current.classList.remove("logo-disappear");
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isScrolled]);

    /*multiple condition rendering*/
    function RenderLog() {
        const role = JSON.parse(window.sessionStorage.getItem("accountData")).role;
        if (role === "admin") {
            return (
                createElement(Link, {to: "/admin", className: "nav-link"}, "Admin")
            );
        } else {
            return (
                createElement(Link, {to: "/myBookings", className: "nav-link"}, "My Bookings")
            );
        }
    }

    function RenderResponsive() {
        if (isNavVisible === true) { //on small screen;
            const linkElements = [];
            if (JSON.parse(window.sessionStorage.getItem("accountData"))) {
                linkElements.push(RenderLog());
            } else {
                linkElements.push(
                    createElement(Link, {to: "/login", className: "nav-link"}, "Login"),
                    createElement(Link, {to: "/register", className: "nav-link"}, "Sign Up"),
                );
            }
            return (
                createElement("div", {className: "nav-link-log-group"}, linkElements)
            );
        } else { //on large screen;
            const divElements = [];
            if (JSON.parse(window.sessionStorage.getItem("accountData"))) {
                divElements.push(RenderLog());
            } else {
                const links = [
                    createElement(Link, {to: "/login", className: "nav-link"}, "Login"),
                    createElement(Link, {to: "/register", className: "nav-link"}, "Sign Up"),
                ];
                divElements.push(
                    createElement("button", {className: "nav-link-btn"},
                        createElement(FaRegUserCircle, {className: "nav-link-icon"})
                    ),
                    createElement("div", {className: "dropdown-content"}, links)
                );
            }
            return (
                createElement("div", {className: "nav-link-group-on-large-screen"}, divElements)
            );
        }
    }


    return (
        <header ref={headerRef}>
            <div className="navbar-brand flexbox-item">
                <div>
                    <FaHotel className="hotel-icon" ref={logoRef}/>
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
                    {RenderResponsive()}
                </div>
                <button onClick={showBar} className="nav-btn nav-btn-close">
                    <FaTimes/>
                </button>
            </nav>
        </header>
    );
}

export default Navbar;


/*<div className="dropdown-content">
                                    <Link to="/login" className="nav-link">Login</Link>
                                    <Link to="/register" className="nav-link">Sign Up</Link>
                                </div>*/