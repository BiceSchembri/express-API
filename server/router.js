// Core modules
const express = require('express'); //
const router = express.Router();
const pool = require('./db.js');

// Set up a connection to the database
const connectToDatabase = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    let data = await connection.query(
      `SELECT title, description, price_in_EUR FROM tattoo_collection.tattoos`
    );
    return data;
  } catch (err) {
    throw err;
  } finally {
    if (connection) connection.end();
  }
};

// Show landing page
router.get('/', (req, res) => {
  res.send('This is the landing page of my tattoo e-shop. Welcome!');

  //in a real-world app, this would be sending back a file, for example:
  // res.send()
});

// Show all records from database (API)
router.get('/tattoos/index', async (req, res) => {
  let data = await connectToDatabase();
  res.send(data);
});

// Export the router
module.exports = router;
