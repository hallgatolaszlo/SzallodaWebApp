import {useLoginContext} from "../contexts/LoginContext.jsx";
import '../css/admin/admin.css';
import {useRoomsAndBookingsContext} from "../contexts/RoomsAndBookingsContext.jsx";
import {Sidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';
import {useEffect, useState} from "react";
import {getFromAPI} from "../services/api.js";


function Admin() {
    const {bookings, guests, loading} = useRoomsAndBookingsContext();
    const {isLoggedIn, role} = useLoginContext();
    const [accounts, setAccounts] = useState(null);
    const [selectedContent, setSelectedContent] = useState(null);

    useEffect(() => {
        async function fetchAccounts() {
            return await getFromAPI("accounts");
        }


        fetchAccounts().then(data => setAccounts(data));
    }, []);

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

    function renderGuests() {
        return (
            <div className="admin-guests-list">
                {guests.map((guest) => (
                    <div key={guest.id} className="admin-guest-card">
                        <p>ID: {guest.id}</p>
                        <p>Name: {guest.name}</p>
                        <p>Email: {guest.email}</p>
                        <p>Phone: {guest.phone}</p>
                        <p>Account ID: {guest.accountId}</p>
                    </div>
                ))}
            </div>
        );
    }

    function renderBookings() {
        return (
            <div className="admin-guests-list">
                {bookings.map((booking) => (
                    <div key={booking.id} className="admin-guest-card">
                        <p>ID: {booking.id}</p>
                        <p>Room ID: {booking.roomId}</p>
                        <p>Guest ID: {booking.guestId}</p>
                        <p>Guest count: {booking.guestCount}</p>
                        <p>Start date: {booking.start}</p>
                        <p>End date: {booking.end}</p>
                        <p>Cost: {booking.cost}</p>
                    </div>
                ))}
            </div>
        );
    }

    function renderAccounts() {
        return (
            <div className="admin-guests-list">
                {accounts.map((account) => (
                    <div key={account.id} className="admin-guest-card">
                        <p>ID: {account.id}</p>
                        <p>Username: {account.username}</p>
                        <p>Password: {account.password}</p>
                        <p>Role: {account.role}</p>
                    </div>
                ))}
            </div>
        );
    }

    function showContent() {
        setSelectedContent(renderGuests());
    }
    function showBookings() {
        setSelectedContent(renderBookings());
    }
    function showAccounts() {
        setSelectedContent(renderAccounts());
    }
    function sortGuestsById() {
        console.log("sorting")
        const sortedGuests = [...guests].sort((a, b) => Number(a.id) - Number(b.id));
        setSelectedContent(
            <div className="admin-guests-list">
                {sortedGuests.map((guest) => (
                    <div key={guest.id} className="admin-guest-card">
                        <p>ID: {guest.id}</p>
                        <p>Name: {guest.name}</p>
                        <p>Email: {guest.email}</p>
                        <p>Phone: {guest.phone}</p>
                        <p>Account ID: {guest.accountId}</p>
                    </div>
                ))}
            </div>
        );
    }



    return (
        <div>
            <div className="admin-page-sidebar">
                <Sidebar>
                    <Menu>
                        <SubMenu label="Guests">
                            <MenuItem onClick={showContent}> Show Guests </MenuItem>
                            <SubMenu label="Order guests by">
                                <MenuItem onClick={sortGuestsById}> ID </MenuItem>
                                <MenuItem> Name </MenuItem>
                                <MenuItem> E-mail </MenuItem>
                                <MenuItem> Phone number </MenuItem>
                                <MenuItem> Account ID </MenuItem>
                            </SubMenu>
                        </SubMenu>

                        <SubMenu label="Bookings">
                            <MenuItem onClick={showBookings}> Show Bookings </MenuItem>
                            <SubMenu label="Order bookings by">
                                <MenuItem> ID </MenuItem>
                                <MenuItem> Room ID </MenuItem>
                                <MenuItem> Guest ID </MenuItem>
                                <MenuItem> Guest count </MenuItem>
                                <MenuItem> Start date </MenuItem>
                                <MenuItem> End date </MenuItem>
                                <MenuItem> Cost </MenuItem>
                            </SubMenu>
                        </SubMenu>

                        <SubMenu label="Accounts">
                            <MenuItem onClick={showAccounts}> Show Accounts </MenuItem>
                            <SubMenu label="Order accounts by">
                                <MenuItem> ID </MenuItem>
                                <MenuItem> Username </MenuItem>
                                <MenuItem> Password </MenuItem>
                            </SubMenu>
                        </SubMenu>
                        <MenuItem> Documentation </MenuItem>
                    </Menu>
                </Sidebar>
            </div>

            <div className="admin-page-sidebar-selected-content">
                {selectedContent}
            </div>
        </div>
    );
}

export default Admin;