import {useLoginContext} from "../contexts/LoginContext.jsx";
import '../css/admin/admin.css';
import {useRoomsAndBookingsContext} from "../contexts/RoomsAndBookingsContext.jsx";
import {Sidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';
import {useEffect, useState} from "react";
import {getFromAPI, removeFromDB} from "../services/api.js";


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
                        <button key={guest.id}
                                onClick={async () => {
                                    async function removeShit() {
                                        await removeFromDB("guests", guest.id);
                                        const guestsBookings = bookings.filter(booking => booking.guestId.toString() === guest.id.toString());
                                        for (const booking of guestsBookings) {
                                            await removeFromDB("bookings", booking.id);
                                        }
                                    }

                                    await removeShit().then(() => {
                                        window.location.reload();
                                    }).catch(err => console.log(err));
                                }
                                }
                                className="admin-guest-delete-button">
                            DELETE
                        </button>
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
                        <button key={booking.id} onClick={
                            async () => {
                                await removeFromDB("bookings", booking.id).then(() => {
                                    window.location.reload();
                                });
                            }
                        } className="admin-guest-delete-button">
                            DELETE
                        </button>
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
                        <p>Role: {account.role}</p>
                        <button key={account.id} onClick={
                            async () => {
                                await removeFromDB("accounts", account.id).then(() => {
                                    window.location.reload();
                                });

                            }
                        } className="admin-guest-delete-button">
                            DELETE
                        </button>
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
        console.log("sorting");
        const sortedGuests = [...guests].sort((a, b) => a.id.localeCompare(b.id));
        setSelectedContent(
            <div className="admin-guests-list">
                {sortedGuests.map((guest) => (
                    <div key={guest.id} className="admin-guest-card">
                        <p>ID: {guest.id}</p>
                        <p>Name: {guest.name}</p>
                        <p>Email: {guest.email}</p>
                        <p>Phone: {guest.phone}</p>
                        <p>Account ID: {guest.accountId}</p>
                        <button key={guest.id}
                                onClick={async () => {
                                    async function removeShit() {
                                        await removeFromDB("guests", guest.id);
                                        const guestsBookings = bookings.filter(booking => booking.guestId.toString() === guest.id.toString());
                                        for (const booking of guestsBookings) {
                                            await removeFromDB("bookings", booking.id).then(() => {
                                                window.location.reload();
                                            });
                                        }
                                    }

                                    await removeShit().then(data => console.log(data)).catch(err => console.log(err));
                                }
                                }
                                className="admin-guest-delete-button">
                            DELETE
                        </button>
                    </div>
                ))}
            </div>
        );
    }

    function sortGuestsByName() {
        console.log("sorting");
        const sortedGuests = [...guests].sort((a, b) => a.name.localeCompare(b.name));
        setSelectedContent(
            <div className="admin-guests-list">
                {sortedGuests.map((guest) => (
                    <div key={guest.id} className="admin-guest-card">
                        <p>ID: {guest.id}</p>
                        <p>Name: {guest.name}</p>
                        <p>Email: {guest.email}</p>
                        <p>Phone: {guest.phone}</p>
                        <p>Account ID: {guest.accountId}</p>
                        <button key={guest.id}
                                onClick={async () => {
                                    async function removeShit() {
                                        await removeFromDB("guests", guest.id);
                                        const guestsBookings = bookings.filter(booking => booking.guestId.toString() === guest.id.toString());
                                        for (const booking of guestsBookings) {
                                            await removeFromDB("bookings", booking.id).then(() => {
                                                window.location.reload();
                                            });
                                        }
                                    }

                                    await removeShit().then(data => console.log(data)).catch(err => console.log(err));
                                }
                                }
                                className="admin-guest-delete-button">
                            DELETE
                        </button>
                    </div>
                ))}
            </div>
        );
    }

    function sortGuestsByEmail() {
        console.log("sorting");
        const sortedGuests = [...guests].sort((a, b) => a.email.localeCompare(b.email));
        setSelectedContent(
            <div className="admin-guests-list">
                {sortedGuests.map((guest) => (
                    <div key={guest.id} className="admin-guest-card">
                        <p>ID: {guest.id}</p>
                        <p>Name: {guest.name}</p>
                        <p>Email: {guest.email}</p>
                        <p>Phone: {guest.phone}</p>
                        <p>Account ID: {guest.accountId}</p>
                        <button key={guest.id}
                                onClick={async () => {
                                    async function removeShit() {
                                        await removeFromDB("guests", guest.id);
                                        const guestsBookings = bookings.filter(booking => booking.guestId.toString() === guest.id.toString());
                                        for (const booking of guestsBookings) {
                                            await removeFromDB("bookings", booking.id).then(() => {
                                                window.location.reload();
                                            });
                                        }
                                    }

                                    await removeShit().then(data => console.log(data)).catch(err => console.log(err));
                                }
                                }
                                className="admin-guest-delete-button">
                            DELETE
                        </button>
                    </div>
                ))}
            </div>
        );
    }

    function sortGuestsByPhone() {
        console.log("sorting");
        const sortedGuests = [...guests].sort((a, b) => Number(a.phone) - Number(b.phone));
        setSelectedContent(
            <div className="admin-guests-list">
                {sortedGuests.map((guest) => (
                    <div key={guest.id} className="admin-guest-card">
                        <p>ID: {guest.id}</p>
                        <p>Name: {guest.name}</p>
                        <p>Email: {guest.email}</p>
                        <p>Phone: {guest.phone}</p>
                        <p>Account ID: {guest.accountId}</p>
                        <button key={guest.id}
                                onClick={async () => {
                                    async function removeShit() {
                                        await removeFromDB("guests", guest.id);
                                        const guestsBookings = bookings.filter(booking => booking.guestId.toString() === guest.id.toString());
                                        for (const booking of guestsBookings) {
                                            await removeFromDB("bookings", booking.id).then(() => {
                                                window.location.reload();
                                            });
                                        }
                                    }

                                    await removeShit().then(data => console.log(data)).catch(err => console.log(err));
                                }
                                }
                                className="admin-guest-delete-button">
                            DELETE
                        </button>
                    </div>
                ))}
            </div>
        );
    }

    function sortGuestsByAccId() {
        console.log("sorting");
        const sortedGuests = [...guests].sort((a, b) => Number(a.accountId) - Number(b.accountId));
        setSelectedContent(
            <div className="admin-guests-list">
                {sortedGuests.map((guest) => (
                    <div key={guest.id} className="admin-guest-card">
                        <p>ID: {guest.id}</p>
                        <p>Name: {guest.name}</p>
                        <p>Email: {guest.email}</p>
                        <p>Phone: {guest.phone}</p>
                        <p>Account ID: {guest.accountId}</p>
                        <button key={guest.id}
                                onClick={async () => {
                                    async function removeShit() {
                                        await removeFromDB("guests", guest.id);
                                        const guestsBookings = bookings.filter(booking => booking.guestId.toString() === guest.id.toString());
                                        for (const booking of guestsBookings) {
                                            await removeFromDB("bookings", booking.id).then(() => {
                                                window.location.reload();
                                            });
                                        }
                                    }

                                    await removeShit().then(data => console.log(data)).catch(err => console.log(err));
                                }
                                }
                                className="admin-guest-delete-button">
                            DELETE
                        </button>
                    </div>
                ))}
            </div>
        );
    }

    function sortBookingsById() {
        console.log("sorting");
        const sortedBookings = [...bookings].sort((a, b) => Number(a.id) - Number(b.id));
        setSelectedContent(
            <div className="admin-guests-list">
                {sortedBookings.map((booking) => (
                    <div key={booking.id} className="admin-guest-card">
                        <p>ID: {booking.id}</p>
                        <p>Room ID: {booking.roomId}</p>
                        <p>Guest ID: {booking.guestId}</p>
                        <p>Guest count: {booking.guestCount}</p>
                        <p>Start date: {booking.start}</p>
                        <p>End date: {booking.end}</p>
                        <p>Cost: {booking.cost}</p>
                        <button key={booking.id} onClick={
                            async () => {
                                await removeFromDB("bookings", booking.id).then(() => {
                                    window.location.reload();
                                });
                            }
                        } className="admin-guest-delete-button">
                            DELETE
                        </button>
                    </div>
                ))}
            </div>
        );
    }

    function sortBookingsByRoomId() {
        console.log("sorting");
        const sortedBookings = [...bookings].sort((a, b) => Number(a.roomId) - Number(b.roomId));
        setSelectedContent(
            <div className="admin-guests-list">
                {sortedBookings.map((booking) => (
                    <div key={booking.id} className="admin-guest-card">
                        <p>ID: {booking.id}</p>
                        <p>Room ID: {booking.roomId}</p>
                        <p>Guest ID: {booking.guestId}</p>
                        <p>Guest count: {booking.guestCount}</p>
                        <p>Start date: {booking.start}</p>
                        <p>End date: {booking.end}</p>
                        <p>Cost: {booking.cost}</p>
                        <button key={booking.id} onClick={
                            async () => {
                                await removeFromDB("bookings", booking.id).then(() => {
                                    window.location.reload();
                                });
                            }
                        } className="admin-guest-delete-button">
                            DELETE
                        </button>
                    </div>
                ))}
            </div>
        );
    }

    function sortBookingsByGuestId() {
        console.log("sorting");
        const sortedBookings = [...bookings].sort((a, b) => Number(a.guestId) - Number(b.guestId));
        setSelectedContent(
            <div className="admin-guests-list">
                {sortedBookings.map((booking) => (
                    <div key={booking.id} className="admin-guest-card">
                        <p>ID: {booking.id}</p>
                        <p>Room ID: {booking.roomId}</p>
                        <p>Guest ID: {booking.guestId}</p>
                        <p>Guest count: {booking.guestCount}</p>
                        <p>Start date: {booking.start}</p>
                        <p>End date: {booking.end}</p>
                        <p>Cost: {booking.cost}</p>
                        <button key={booking.id} onClick={
                            async () => {
                                await removeFromDB("bookings", booking.id).then(() => {
                                    window.location.reload();
                                });
                            }
                        } className="admin-guest-delete-button">
                            DELETE
                        </button>
                    </div>
                ))}
            </div>
        );
    }

    function sortBookingsByGuestCount() {
        console.log("sorting");
        const sortedBookings = [...bookings].sort((a, b) => Number(a.guestCount) - Number(b.guestCount));
        setSelectedContent(
            <div className="admin-guests-list">
                {sortedBookings.map((booking) => (
                    <div key={booking.id} className="admin-guest-card">
                        <p>ID: {booking.id}</p>
                        <p>Room ID: {booking.roomId}</p>
                        <p>Guest ID: {booking.guestId}</p>
                        <p>Guest count: {booking.guestCount}</p>
                        <p>Start date: {booking.start}</p>
                        <p>End date: {booking.end}</p>
                        <p>Cost: {booking.cost}</p>
                        <button key={booking.id} onClick={
                            async () => {
                                await removeFromDB("bookings", booking.id).then(() => {
                                    window.location.reload();
                                });
                            }
                        } className="admin-guest-delete-button">
                            DELETE
                        </button>
                    </div>
                ))}
            </div>
        );
    }

    function sortBookingsByStartDate() {
        console.log("sorting");
        const sortedBookings = [...bookings].sort((a, b) => new Date(a.start) - new Date(b.start));
        setSelectedContent(
            <div className="admin-guests-list">
                {sortedBookings.map((booking) => (
                    <div key={booking.id} className="admin-guest-card">
                        <p>ID: {booking.id}</p>
                        <p>Room ID: {booking.roomId}</p>
                        <p>Guest ID: {booking.guestId}</p>
                        <p>Guest count: {booking.guestCount}</p>
                        <p>Start date: {booking.start}</p>
                        <p>End date: {booking.end}</p>
                        <p>Cost: {booking.cost}</p>
                        <button key={booking.id} onClick={
                            async () => {
                                await removeFromDB("bookings", booking.id).then(() => {
                                    window.location.reload();
                                });
                            }
                        } className="admin-guest-delete-button">
                            DELETE
                        </button>
                    </div>
                ))}
            </div>
        );
    }

    function sortBookingsByEndDate() {
        console.log("sorting");
        const sortedBookings = [...bookings].sort((a, b) => new Date(a.end) - new Date(b.end));
        setSelectedContent(
            <div className="admin-guests-list">
                {sortedBookings.map((booking) => (
                    <div key={booking.id} className="admin-guest-card">
                        <p>ID: {booking.id}</p>
                        <p>Room ID: {booking.roomId}</p>
                        <p>Guest ID: {booking.guestId}</p>
                        <p>Guest count: {booking.guestCount}</p>
                        <p>Start date: {booking.start}</p>
                        <p>End date: {booking.end}</p>
                        <p>Cost: {booking.cost}</p>
                        <button key={booking.id} onClick={
                            async () => {
                                await removeFromDB("bookings", booking.id).then(() => {
                                    window.location.reload();
                                });
                            }
                        } className="admin-guest-delete-button">
                            DELETE
                        </button>
                    </div>
                ))}
            </div>
        );
    }

    function sortBookingsByCost() {
        console.log("sorting");
        const sortedBookings = [...bookings].sort((a, b) => Number(a.cost) - Number(b.cost));
        setSelectedContent(
            <div className="admin-guests-list">
                {sortedBookings.map((booking) => (
                    <div key={booking.id} className="admin-guest-card">
                        <p>ID: {booking.id}</p>
                        <p>Room ID: {booking.roomId}</p>
                        <p>Guest ID: {booking.guestId}</p>
                        <p>Guest count: {booking.guestCount}</p>
                        <p>Start date: {booking.start}</p>
                        <p>End date: {booking.end}</p>
                        <p>Cost: {booking.cost}</p>
                        <button key={booking.id} onClick={
                            async () => {
                                await removeFromDB("bookings", booking.id).then(() => {
                                    window.location.reload();
                                });
                            }
                        } className="admin-guest-delete-button">
                            DELETE
                        </button>
                    </div>
                ))}
            </div>
        );
    }

    function sortAccountsById() {
        console.log("sorting");
        const sortedAccounts = [...accounts].sort((a, b) => Number(a.id) - Number(b.id));
        setSelectedContent(
            <div className="admin-guests-list">
                {sortedAccounts.map((account) => (
                    <div key={account.id} className="admin-guest-card">
                        <p>ID: {account.id}</p>
                        <p>Username: {account.username}</p>
                        <p>Role: {account.role}</p>
                        <button key={account.id} onClick={
                            async () => {
                                await removeFromDB("accounts", account.id).then(() => {
                                    window.location.reload();
                                });
                            }
                        } className="admin-guest-delete-button">
                            DELETE
                        </button>
                    </div>
                ))}
            </div>
        );
    }

    function sortAccountByUsername() {
        console.log("sorting");
        const sortedAccounts = [...accounts].sort((a, b) => a.username.localeCompare(b.username));
        setSelectedContent(
            <div className="admin-guests-list">
                {sortedAccounts.map((account) => (
                    <div key={account.id} className="admin-guest-card">
                        <p>ID: {account.id}</p>
                        <p>Username: {account.username}</p>
                        <p>Role: {account.role}</p>
                        <button key={account.id} onClick={
                            async () => {
                                await removeFromDB("accounts", account.id).then(() => {
                                    window.location.reload();
                                });
                            }
                        } className="admin-guest-delete-button">
                            DELETE
                        </button>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="admin-page">
            <div className="admin-page-container">
                <div className="admin-page-sidebar">
                    <Sidebar>
                        <Menu>
                            <SubMenu label="Guests">
                                <MenuItem onClick={showContent}> Show Guests </MenuItem>
                                <SubMenu label="Order guests by">
                                    <MenuItem onClick={sortGuestsById}> ID </MenuItem>
                                    <MenuItem onClick={sortGuestsByName}> Name </MenuItem>
                                    <MenuItem onClick={sortGuestsByEmail}> E-mail </MenuItem>
                                    <MenuItem onClick={sortGuestsByPhone}> Phone number </MenuItem>
                                    <MenuItem onClick={sortGuestsByAccId}> Account ID </MenuItem>
                                </SubMenu>
                            </SubMenu>

                            <SubMenu label="Bookings">
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

                            <SubMenu label="Accounts">
                                <MenuItem onClick={showAccounts}> Show Accounts </MenuItem>
                                <SubMenu label="Order accounts by">
                                    <MenuItem onClick={sortAccountsById}> ID </MenuItem>
                                    <MenuItem onClick={sortAccountByUsername}> Username </MenuItem>
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
        </div>
    );
}

export default Admin;