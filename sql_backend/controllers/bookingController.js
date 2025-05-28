/*

const pool = require('../config/db');

const getBookings = async (req, res) => {
    try {
        const [bookings] = await pool.execute(`
            SELECT b.*, r.name as roomName, g.name as guestName
            FROM bookings b
                     JOIN rooms r ON b.roomId = r.id
                     JOIN guests g ON b.guestId = g.id
        `);
        res.json(bookings);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const createBooking = async (req, res) => {
    const {roomId, guestId, guestCount, start, end, cost} = req.body;
    try {
        const [result] = await pool.execute(
            'INSERT INTO bookings (id, roomId, guestId, guestCount, start, end, cost) VALUES (UUID(), ?, ?, ?, ?, ?, ?)',
            [roomId, guestId, guestCount, start, end, cost]
        );
        res.status(201).json({id: result.insertId, ...req.body});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateBooking = async (req, res) => {
    const {guestCount, start, end, cost} = req.body;
    try {
        await pool.execute(
            'UPDATE bookings SET guestCount = ?, start = ?, end = ?, cost = ? WHERE id = ?',
            [guestCount, start, end, cost, req.params.id]
        );
        res.json({message: 'Booking updated successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteBooking = async (req, res) => {
    try {
        await pool.execute('DELETE FROM bookings WHERE id = ?', [req.params.id]);
        res.json({message: 'Booking deleted successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getBookings,
    createBooking,
    updateBooking,
    deleteBooking
};

 */