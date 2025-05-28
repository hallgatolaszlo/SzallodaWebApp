const pool = require('../config/db');

const getRooms = async (req, res) => {
    try {
        const [rooms] = await pool.execute('SELECT * FROM rooms');
        res.json(rooms);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getRoomById = async (req, res) => {
    try {
        const [room] = await pool.execute('SELECT * FROM rooms WHERE id = ?', [req.params.id]);
        if (room.length > 0) {
            res.json(room[0]);
        } else {
            res.status(404).json({message: 'Room not found'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getRooms,
    getRoomById
};