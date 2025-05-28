import './css/App.css';
import Home from './pages/Home.jsx';
import Login from "./pages/Login.jsx";
import Booking from "./pages/Booking.jsx";
import Admin from "./pages/Admin.jsx";
import Register from "./pages/Register.jsx";
import Gallery from "./pages/Gallery.jsx";
import GalleryRooms from "./pages/GalleryRooms.jsx";
import GalleryLobbies from "./pages/GalleryLobbies.jsx";
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import {RoomsAndBookingsContextProvider} from "./contexts/RoomsAndBookingsContext.jsx";
import {LoginContextProvider} from "./contexts/LoginContext.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import {LocationContextProvider} from "./contexts/LocationContext.jsx";

function App() {
    return (
        <div>
            <LocationContextProvider>
                <LoginContextProvider>
                    <RoomsAndBookingsContextProvider>
                        <Navbar/>
                        <main>
                            <Routes>
                                <Route path="/" element={<Home/>}></Route>
                                <Route path="/login" element={<Login/>}></Route>
                                <Route path="/booking" element={<Booking/>}></Route>
                                <Route path="/admin" element={<Admin/>}></Route>
                                <Route path="/register" element={<Register/>}></Route>
                                <Route path="/myBookings" element={<MyBookings/>}></Route>
                                <Route path="/gallery" element={<Gallery/>}></Route>
                                <Route path="/gallery-lobbies" element={<GalleryLobbies/>}></Route>
                                <Route path="/gallery-rooms" element={<GalleryRooms/>}></Route>
                            </Routes>
                        </main>
                    </RoomsAndBookingsContextProvider>
                </LoginContextProvider>
            </LocationContextProvider>
        </div>
    );
}

export default App;
