const pool = require('../config/db');

const getGuests = async (req, res) => {
    try {
        const [guests] = await pool.execute('SELECT * FROM guests');
        res.json(guests);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getGuestById = async (req, res) => {
    try {
        const [guest] = await pool.execute('SELECT * FROM guests WHERE id = ?', [req.params.id]);
        if (guest.length > 0) {
            res.json(guest[0]);
        } else {
            res.status(404).json({message: 'Guest not found'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const createGuest = async (req, res) => {
    const {name, email, phone, accountId} = req.body;
    try {
        const [result] = await pool.execute(
            'INSERT INTO guests (id, name, email, phone, accountId) VALUES (UUID(), ?, ?, ?, ?)',
            [name, email, phone, accountId]
        );
        res.status(201).json({id: result.insertId, ...req.body});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateGuest = async (req, res) => {
    const {name, email, phone} = req.body;
    try {
        await pool.execute(
            'UPDATE guests SET name = ?, email = ?, phone = ? WHERE id = ?',
            [name, email, phone, req.params.id]
        );
        res.json({message: 'Guest updated successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteGuest = async (req, res) => {
    const guestId = req.params.id;

    try {
        const [guest] = await pool.execute('SELECT * FROM guests WHERE id = ?', [guestId]);
        if (guest.length === 0) {
            return res.status(404).json({message: 'Guest not found'});
        }

        await pool.execute('DELETE FROM bookings WHERE guestId = ?', [guestId]);
        await pool.execute('DELETE FROM guests WHERE id = ?', [guestId]);

        res.json({message: 'Guest and related data deleted successfully'});
    } catch (error) {
        console.error('Delete guest error:', error);
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getGuests,
    getGuestById,
    createGuest,
    updateGuest,
    deleteGuest
};