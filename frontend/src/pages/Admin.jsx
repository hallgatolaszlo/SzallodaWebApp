import {useLoginContext} from "../contexts/LoginContext.jsx";
import '../css/admin/admin.css';
import {useRoomsAndBookingsContext} from "../contexts/RoomsAndBookingsContext.jsx";
import {Sidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';
import {useEffect, useState} from "react";
import {getFromAPI, removeFromDB} from "../services/api.js";
import {FaUserGroup} from "react-icons/fa6";
import {FaBookOpen} from "react-icons/fa";
import {MdManageAccounts} from "react-icons/md";
import {IoDocumentText} from "react-icons/io5";


function Admin() {
    const {bookings, guests, loading} = useRoomsAndBookingsContext();
    const {isLoggedIn, role} = useLoginContext();
    const [accounts, setAccounts] = useState(null);
    const [selectedContent, setSelectedContent] = useState(null);
    const [width, setWidth] = useState(0);
    const [collapsed, setCollapsed] = useState(false);


    function GetSize() {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        async function fetchAccounts() {
            return await getFromAPI("accounts");
        }

        fetchAccounts().then(data => setAccounts(data));

    }, []);


    useEffect(() => {
        setWidth(window.innerWidth);

        window.addEventListener('resize', GetSize);

        return () => {
            window.removeEventListener('resize', GetSize);
        };
    }, []);

    useEffect(() => {
        if (width < 769) {
            setCollapsed(true);
        } else {
            setCollapsed(false);
        }
    }, [width]);


    if (!isLoggedIn) {
        return (
            <div className="my-bookings-container">
                <p className="booking-login-warning">You are not logged in</p>
            </div>
        );
    }
    if (role !== "admin") {
        return (
            <div className="my-bookings-container">
                <p className="booking-login-warning">You are not an admin</p>
            </div>
        );
    }
    if (loading) {
        return <div></div>;
    }

    async function handleDelete(type, id, additionalCleanup) {
        try {
            await removeFromDB(type, id);
            if (additionalCleanup) {
                await additionalCleanup();
            }
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    function renderItems(items, renderItemContent, deleteHandler) {
        return (
            <div className="admin-guests-list">
                {items.map((item) => (
                    <div key={item.id} className="admin-guest-card">
                        {renderItemContent(item)}
                        <div className="admin-page-delete-button-container">
                            <button
                                onClick={() => deleteHandler(item)}
                                className="admin-guest-delete-button"
                            >
                                DELETE
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    function sortItems(items, sortKey, isNumeric = false, isDate = false) {
        return [...items].sort((a, b) => {
            if (isDate) {
                return new Date(a[sortKey]) - new Date(b[sortKey]);
            }
            if (isNumeric) {
                return Number(a[sortKey]) - Number(b[sortKey]);
            }
            return a[sortKey].localeCompare(b[sortKey]);
        });
    }

    const renderGuestContent = (guest) => (
        <>
            <div className="admin-page-guest-card-container">
                <p><b>ID:</b> {guest.id}</p>
                <p><b>Name:</b> {guest.name}</p>
                <p><b>Email:</b> {guest.email}</p>
                <p><b>Phone:</b> {guest.phone}</p>
                <p><b>Account ID:</b> {guest.accountId}</p>
            </div>
        </>
    );

    const renderBookingContent = (booking) => (
        <>
            <div className="admin-page-guest-card-container">
                <p><b>ID:</b> {booking.id}</p>
                <p><b>Room ID:</b> {booking.roomId}</p>
                <p><b>Guest ID:</b> {booking.guestId}</p>
                <p><b>Guest count:</b> {booking.guestCount}</p>
                <p><b>Start date:</b> {booking.start}</p>
                <p><b>End date:</b> {booking.end}</p>
                <p><b>Cost:</b> {booking.cost}</p>
            </div>
        </>
    );

    const renderAccountContent = (account) => (
        <>
            <div className="admin-page-guest-card-container">
                <p><b>ID:</b> {account.id}</p>
                <p><b>Username:</b> {account.username}</p>
                <p><b>Role:</b> {account.role}</p>
            </div>
        </>
    );

    const handleGuestDelete = async (guest) => {
        const additionalCleanup = async () => {
            const guestsBookings = bookings.filter(
                booking => booking.guestId.toString() === guest.id.toString()
            );
            for (const booking of guestsBookings) {
                await removeFromDB("bookings", booking.id);
            }
        };
        await handleDelete("guests", guest.id, additionalCleanup);
    };

    const handleBookingDelete = async (booking) => {
        await handleDelete("bookings", booking.id);
    };

    const handleAccountDelete = async (account) => {
        await handleDelete("accounts", account.id);
    };

    function showItems(items, renderContent, deleteHandler, sortKey = null, isNumeric = false, isDate = false) {
        const itemsToRender = sortKey
            ? sortItems(items, sortKey, isNumeric, isDate)
            : items;

        setSelectedContent(renderItems(itemsToRender, renderContent, deleteHandler));
    }

    const showGuests = () => showItems(guests, renderGuestContent, handleGuestDelete);
    const sortGuestsById = () => showItems(guests, renderGuestContent, handleGuestDelete, 'id');
    const sortGuestsByName = () => showItems(guests, renderGuestContent, handleGuestDelete, 'name');
    const sortGuestsByEmail = () => showItems(guests, renderGuestContent, handleGuestDelete, 'email');
    const sortGuestsByPhone = () => showItems(guests, renderGuestContent, handleGuestDelete, 'phone', true);
    const sortGuestsByAccId = () => showItems(guests, renderGuestContent, handleGuestDelete, 'accountId', true);

    const showBookings = () => showItems(bookings, renderBookingContent, handleBookingDelete);
    const sortBookingsById = () => showItems(bookings, renderBookingContent, handleBookingDelete, 'id', true);
    const sortBookingsByRoomId = () => showItems(bookings, renderBookingContent, handleBookingDelete, 'roomId', true);
    const sortBookingsByGuestId = () => showItems(bookings, renderBookingContent, handleBookingDelete, 'guestId', true);
    const sortBookingsByGuestCount = () => showItems(bookings, renderBookingContent, handleBookingDelete, 'guestCount', true);
    const sortBookingsByStartDate = () => showItems(bookings, renderBookingContent, handleBookingDelete, 'start', false, true);
    const sortBookingsByEndDate = () => showItems(bookings, renderBookingContent, handleBookingDelete, 'end', false, true);
    const sortBookingsByCost = () => showItems(bookings, renderBookingContent, handleBookingDelete, 'cost', true);

    const showAccounts = () => showItems(accounts, renderAccountContent, handleAccountDelete);
    const sortAccountsById = () => showItems(accounts, renderAccountContent, handleAccountDelete, 'id', true);
    const sortAccountsByUsername = () => showItems(accounts, renderAccountContent, handleAccountDelete, 'username');

    return (
        <div className="admin-page">
            <div className="admin-page-container">
                <div className="admin-page-sidebar">
                    <Sidebar collapsed={collapsed}>
                        <Menu>
                            <SubMenu icon={<FaUserGroup/>} label="Guests">
                                <MenuItem onClick={showGuests}> Show Guests </MenuItem>
                                <SubMenu label="Order guests by">
                                    <MenuItem onClick={sortGuestsById}> ID </MenuItem>
                                    <MenuItem onClick={sortGuestsByName}> Name </MenuItem>
                                    <MenuItem onClick={sortGuestsByEmail}> E-mail </MenuItem>
                                    <MenuItem onClick={sortGuestsByPhone}> Phone number </MenuItem>
                                    <MenuItem onClick={sortGuestsByAccId}> Account ID </MenuItem>
                                </SubMenu>
                            </SubMenu>

                            <SubMenu label="Bookings" icon={<FaBookOpen/>}>
                                <MenuItem onClick={showBookings}> Show Bookings </MenuItem>
                                <SubMenu label="Order bookings by">
                                    <MenuItem onClick={sortBookingsById}> ID </MenuItem>
                                    <MenuItem onClick={sortBookingsByRoomId}> Room ID </MenuItem>
                                    <MenuItem onClick={sortBookingsByGuestId}> Guest ID </MenuItem>
                                    <MenuItem onClick={sortBookingsByGuestCount}> Guest count </MenuItem>
                                    <MenuItem onClick={sortBookingsByStartDate}> Start date </MenuItem>
                                    <MenuItem onClick={sortBookingsByEndDate}> End date </MenuItem>
                                    <MenuItem onClick={sortBookingsByCost}> Cost </MenuItem>
                                </SubMenu>
                            </SubMenu>

                            <SubMenu icon={<MdManageAccounts/>} label="Accounts">
                                <MenuItem onClick={showAccounts}> Show Accounts </MenuItem>
                                <SubMenu label="Order accounts by">
                                    <MenuItem onClick={sortAccountsById}> ID </MenuItem>
                                    <MenuItem onClick={sortAccountsByUsername}> Username </MenuItem>
                                </SubMenu>
                            </SubMenu>
                            <MenuItem icon={<IoDocumentText/>}> Documentation </MenuItem>
                        </Menu>
                    </Sidebar>
                </div>

                <div className="admin-page-sidebar-selected-content">
                    {selectedContent}
                </div>
            </div>
        </div>
    );
}

export default Admin;