// Core modules
const express = require('express'); //
const router = express.Router();
const pool = require('./db.js');

// Set up a connection to the database
// const connectToDatabase = async () => {
//   let connection;
//   try {
//     connection = await pool.getConnection();
//     let data = await connection.query(
//       `SELECT title, description, price_in_EUR FROM tattoo_collection.tattoos`
//     );
//     return data;
//   } catch (err) {
//     throw err;
//   } finally {
//     if (connection) connection.end();
//   }
// };

const controllers = {
  getProducts: async (req, res) => {
    let connection;
    try {
      connection = await pool.getConnection();
      const data = await connection.query(
        `SELECT title, description, price_in_EUR FROM tattoo_collection.tattoos`
      );
      res.send(data);
      //   const jsonS = JSON.stringify(data);
      //   res.writeHead(200, { 'Content-Type': 'text/html' });
      //   res.end(jsonS);
    } catch (err) {
      throw err;
    } finally {
      if (connection) connection.end();
    }
  },
};

// Show all records from database (API)
// router.get('/index', async (req, res) => {
//   let data = await connectToDatabase();
//   res.send(data);
// });

module.exports = controllers;
