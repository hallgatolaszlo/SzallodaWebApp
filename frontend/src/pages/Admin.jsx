import {useLoginContext} from "../contexts/LoginContext.jsx";
import '../css/admin/admin.css';
import {useRoomsAndBookingsContext} from "../contexts/RoomsAndBookingsContext.jsx";
import {Sidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';


function Admin() {
    const {bookings, guests, loading} = useRoomsAndBookingsContext();
    const {isLoggedIn, role} = useLoginContext();

    if (!isLoggedIn) {
        return (
            <div className="admin-page-container">
                <p className="admin-not-logged-in">You are not logged in</p>
            </div>
        );
    }
    if (role !== "admin") {
        return (
            <div className="admin-page-container">
                <p className="admin-not-logged-in">You are not an admin</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div></div>
        );
    }


    return (
        <div>
            <Sidebar>
                <Menu>
                    <SubMenu label="Charts">
                        <MenuItem> Pie charts </MenuItem>
                        <MenuItem> Line charts </MenuItem>
                    </SubMenu>
                    <MenuItem> Documentation </MenuItem>
                    <MenuItem> Calendar </MenuItem>
                </Menu>
            </Sidebar>;

        </div>
    );
}

export default Admin;