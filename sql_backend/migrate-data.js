/*

const mysql = require('mysql2/promise');
const fs = require('fs').promises;
require('dotenv').config();

async function migrateData() {
    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
    });

    try {
        // Read JSON data
        const jsonData = JSON.parse(
            await fs.readFile('../json-server-sql_backend/data/db.json', 'utf8')
        );

        // Insert accounts first (because guests depend on accounts)
        for (const account of jsonData.accounts) {
            await pool.execute(
                'INSERT INTO accounts (id, username, password, role) VALUES (?, ?, ?, ?)',
                [account.id, account.username, account.password, account.role]
            );
        }

        // Insert rooms
        for (const room of jsonData.rooms) {
            await pool.execute(
                'INSERT INTO rooms (id, name, price, capacity, image) VALUES (?, ?, ?, ?, ?)',
                [room.id, room.name, room.price, room.capacity, room.image]
            );
        }

        // Insert guests
        for (const guest of jsonData.guests) {
            await pool.execute(
                'INSERT INTO guests (id, name, email, phone, accountId) VALUES (?, ?, ?, ?, ?)',
                [guest.id, guest.name, guest.email, guest.phone, guest.accountId]
            );
        }

        // Insert bookings
        for (const booking of jsonData.bookings) {
            await pool.execute(
                'INSERT INTO bookings (id, roomId, guestId, guestCount, start, end, cost) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [booking.id, booking.roomId, booking.guestId, booking.guestCount, booking.start, booking.end, booking.cost]
            );
        }

        // Insert ratings
        for (const rating of jsonData.ratings) {
            await pool.execute(
                'INSERT INTO ratings (id, guestId, username, rating, text) VALUES (?, ?, ?, ?, ?)',
                [rating.id, rating.guestId, rating.username, rating.rating, rating.text]
            );
        }

        // Insert images
        for (const image of jsonData.images) {
            await pool.execute(
                'INSERT INTO images (id, url, class) VALUES (?, ?, ?)',
                [image.id, image.url, image.class]
            );
        }

        console.log('Data migration completed successfully!');
    } catch (error) {
        console.error('Error during migration:', error);
    } finally {
        await pool.end();
    }
}

migrateData();

*/