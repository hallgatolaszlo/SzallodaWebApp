import {Link} from "react-router-dom"

function Navbar(){
    return (
        <nav className="navbar">
            <div className="navbar-Brand">
                <h1>Hotel Atlantis</h1>
            </div>
            <div className="navbar-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/booking" className="nav-link">Booking</Link>
                <Link to="/login" className="nav-link">Login</Link>
            </div>
        </nav>
    )
}

export default Navbar;