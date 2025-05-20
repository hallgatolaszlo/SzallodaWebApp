import './css/App.css';
import Home from './pages/Home.jsx';
import Login from "./pages/Login.jsx";
import Booking from "./pages/Booking.jsx";
import Admin from "./pages/Admin.jsx";
import Register from "./pages/Register.jsx";
import {Route, Routes} from "react-router-dom";

function App() {

    return (
        <main>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/booking" element={<Booking/>}></Route>
                <Route path="/admin" element={<Admin/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
            </Routes>
        </main>
    );
}

export default App;
