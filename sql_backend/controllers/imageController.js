/*

const pool = require('../config/db');

const getImages = async (req, res) => {
    try {
        const [images] = await pool.execute('SELECT * FROM images');
        res.json(images);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getImagesByClass = async (req, res) => {
    try {
        const [images] = await pool.execute('SELECT * FROM images WHERE class = ?', [req.params.class]);
        res.json(images);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getImages,
    getImagesByClass
};

 */