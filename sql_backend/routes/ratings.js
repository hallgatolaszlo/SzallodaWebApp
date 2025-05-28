const express = require('express');
const router = express.Router();
const {getRatings, createRating} = require('../controllers/ratingController');

router.get('/', getRatings);
router.post('/', createRating);

module.exports = router;