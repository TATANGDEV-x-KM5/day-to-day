const Pool = require('pg').Pool;
const {
    DB_USER,
    DB_NAME,
    DB_PASSWORD,
    DB_PORT = 5432,
    DB_HOST } = process.env;

const pool = new Pool({
    user: DB_USER,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: DB_PORT,
    host: DB_HOST
});

module.exports = pool;