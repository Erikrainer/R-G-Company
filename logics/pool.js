const { Pool } = require('pg');

require('dotenv').config();

console.log('Password:', process.env.PASSWORD);

const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    database: process.env.DATABASE
});

pool.on('connect', () => {
    console.log(`Connected to the ${process.env.DATABASE} database.`);
});

module.exports = pool;
