const express = require('express');
const router = express.Router();
const {getAccounts, login, register, deleteAccount} = require('../controllers/accountController');

router.get('/', getAccounts);
router.post('/login', login);
router.post('/register', register);
router.delete('/:id', deleteAccount);

module.exports = router;