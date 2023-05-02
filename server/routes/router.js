// Core modules
const express = require('express'); //
const router = express.Router();
const pool = require('../db.js');

// GET request - test
router.get('/', (req, res) => {
  res.send('GET request was sent successfully');
});

// Set up a connection to the database
const connectToDatabase = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    let data = await connection.query(
      `SELECT * FROM tattoo_collection.tattoos`
    );
    return data;
  } catch (err) {
    throw err;
  } finally {
    if (connection) connection.end();
  }
};

// Show all data from database (API)
router.get('/show-all', async (req, res) => {
  let data = await connectToDatabase();
  // res.send(data);
  res.send('connected to database');
});

// Export the router
module.exports = router;
