import {Link} from "react-router-dom";
import {createElement, useEffect, useRef, useState} from "react";
import {FaBars, FaTimes, FaRegUserCircle, FaHotel} from "react-icons/fa";
import '../css/Navbar.css';
import {useLoginContext} from "../contexts/LoginContext.jsx";


function Navbar() {
    const {isLoggedIn, role, logout} = useLoginContext();
    /*navbar responsivity*/
    const navRef = useRef();
    const [isNavVisible, setIsNavVisible] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);

    const showBar = () => {
        setIsNavVisible(!isNavVisible);
        navRef.current.classList.toggle("show-nav");
    };

    const hideBar = () => {
        setIsNavVisible(false);
        navRef.current.classList.remove("show-nav");
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [width]);

    function handleResize() {
        setWidth(window.innerWidth);
        if (width > 768 && isNavVisible) {
            showBar();
        }
    }

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
        return role === "admin" ? createElement(Link, {
                to: "/admin",
                className: "nav-link",
                key: 1,
                onClick: hideBar
            }, "Admin") :
            createElement(Link, {
                to: "/myBookings",
                className: "nav-link",
                key: 2,
                onClick: hideBar
            }, "My Bookings");
    }

    function RenderResponsive() {
        const divElements = [
            createElement(Link, {
                to: "/",
                className: "nav-link",
                key: 3,
                onClick: hideBar
            }, "Home"),
            createElement(Link, {
                to: "/booking",
                className: "nav-link",
                key: 4,
                onClick: hideBar
            }, "Booking"),
            createElement(Link, {
                to: "/gallery",
                className: "nav-link",
                key:99,
                onClick: hideBar
            }, "Gallery")
        ];

        if (isNavVisible === true) { //on a small screen;
            const linkElements = isLoggedIn ? (
                [RenderLog(), createElement("button", {
                    className: "nav-link log-out-btn",
                    onClick: logout,
                    key: 8,
                }, "Log out")]
            ) : (
                [createElement(Link, {
                    to: "/login",
                    className: "nav-link",
                    key: 5,
                    onClick: hideBar
                }, "Login"),
                    createElement(Link, {
                        to: "/register",
                        className: "nav-link",
                        key: 6,
                        onClick: hideBar
                    }, "Sign Up")]);

            divElements.push(createElement("div", {
                className: "nav-link-log-group",
                key: 7
            }, linkElements));
        } else { //on a large screen;
            const linkElements = [
                createElement("button", {className: "nav-link-btn", key: 9},
                    createElement(FaRegUserCircle, {className: "nav-link-icon", key: 10})
                )
            ];
            if (isLoggedIn) {
                divElements.push(RenderLog());
                linkElements.push(createElement("button", {
                    className: "dropdown-content log-out-btn",
                    onClick: logout,
                    key: 11
                }, "Log out"));
            } else {
                //dropdown menu;
                linkElements.push(
                    createElement("div", {className: "dropdown-content", key: 14}, [
                        createElement(Link, {
                            to: "/login",
                            className: "nav-link",
                            key: 12, onClick:
                            hideBar
                        }, "Login"),
                        createElement(Link, {
                            to: "/register",
                            className: "nav-link",
                            key: 13,
                            onClick: hideBar
                        }, "Sign Up"),
                    ])
                );

            }
            divElements.push(createElement("div", {className: "nav-link dropdown", key: 15}, linkElements));
        }

        return createElement("div", {className: "navbar-links", key: 16}, divElements);
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
                {RenderResponsive()}
                <button onClick={showBar} className="nav-btn nav-btn-close">
                    <FaTimes/>
                </button>
            </nav>
        </header>
    );
}

export default Navbar;