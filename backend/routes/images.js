const express = require('express');
const router = express.Router();
const {getImages, getImagesByClass} = require('../controllers/imageController');

router.get('/', getImages);
router.get('/class/:class', getImagesByClass);

module.exports = router;