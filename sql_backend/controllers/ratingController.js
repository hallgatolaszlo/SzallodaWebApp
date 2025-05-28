/*

const pool = require('../config/db');

const getRatings = async (req, res) => {
    try {
        const [ratings] = await pool.execute('SELECT * FROM ratings');
        res.json(ratings);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const createRating = async (req, res) => {
    const {guestId, username, rating, text} = req.body;
    try {
        const [result] = await pool.execute(
            'INSERT INTO ratings (id, guestId, username, rating, text) VALUES (UUID(), ?, ?, ?, ?)',
            [guestId, username, rating, text]
        );
        res.status(201).json({id: result.insertId, ...req.body});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getRatings,
    createRating
};

 */