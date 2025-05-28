/*

const pool = require('../config/db');

const getAccounts = async (req, res) => {
    try {
        const [accounts] = await pool.execute('SELECT * FROM accounts');
        res.json(accounts);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const login = async (req, res) => {
    const {username, password} = req.body;
    try {
        const [accounts] = await pool.execute(
            'SELECT * FROM accounts WHERE username = ? AND password = ?',
            [username, password]
        );
        if (accounts.length > 0) {
            const account = accounts[0];
            res.json({
                id: account.id,
                username: account.username,
                role: account.role
            });
        } else {
            res.status(401).json({message: 'Invalid credentials'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const register = async (req, res) => {
    const {username, password} = req.body;
    try {
        const [existing] = await pool.execute('SELECT * FROM accounts WHERE username = ?', [username]);
        if (existing.length > 0) {
            return res.status(400).json({message: 'Username already exists'});
        }

        await pool.execute(
            'INSERT INTO accounts (id, username, password, role) VALUES (UUID(), ?, ?, ?)',
            [username, password, "user"]
        );
        res.status(201).json({message: 'Account created successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteAccount = async (req, res) => {
    const accountId = req.params.id;

    try {
        const [account] = await pool.execute(
            'SELECT * FROM accounts WHERE id = ?',
            [accountId]
        );

        if (account.length === 0) {
            return res.status(404).json({message: 'Account not found'});
        }

        await pool.execute(`
                    DELETE bookings
                    FROM bookings
                             INNER JOIN guests ON bookings.guestId = guests.id
                    WHERE guests.accountId = ?`,
            [accountId]
        );

        await pool.execute(
            'DELETE FROM guests WHERE accountId = ?',
            [accountId]
        );

        await pool.execute(
            'DELETE FROM accounts WHERE id = ?',
            [accountId]
        );

        res.json({message: 'Account and all related data deleted successfully'});

    } catch (error) {
        console.error('Delete account error:', error);
        res.status(500).json({message: error.message});
    }
};


module.exports = {
    getAccounts,
    login,
    register,
    deleteAccount
};

 */