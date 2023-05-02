const mariadb = require('mariadb');
const dotenv = require('dotenv');
dotenv.config();

// Set up a pool (used to connect to database and execute queries)
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectionLimit: 5,
});

// Export the pool
module.exports = pool;
