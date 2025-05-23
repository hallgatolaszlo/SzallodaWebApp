import './css/App.css';
import Home from './pages/Home.jsx';
import Login from "./pages/Login.jsx";
import Booking from "./pages/Booking.jsx";
import Admin from "./pages/Admin.jsx";
import Register from "./pages/Register.jsx";
import Gallery from "./pages/Gallery.jsx";
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import {RoomsAndBookingsContextProvider} from "./contexts/RoomsAndBookingsContext.jsx";

function App() {

    return (
        <div>
            <RoomsAndBookingsContextProvider>
                <Navbar/>
                <main>
                    <Routes>
                        <Route path="/" element={<Home/>}></Route>
                        <Route path="/login" element={<Login/>}></Route>
                        <Route path="/booking" element={<Booking/>}></Route>
                        <Route path="/admin" element={<Admin/>}></Route>
                        <Route path="/register" element={<Register/>}></Route>
                        <Route path="/gallery" element={<Gallery/>}></Route>
                    </Routes>
                </main>
            </RoomsAndBookingsContextProvider>
        </div>
    );
}

export default App;
