// Imports
const pool = require('../configs/db.js');
const bcrypt = require('bcrypt');

// Controllers
const adminController = {
  // Show all admins
  // This is available to admins only
  getAllAdmins: async (req, res) => {
    let connection;
    try {
      connection = await pool.getConnection();
      let result = await connection.query(
        `SELECT * FROM tattoo_eshop.users WHERE tattoo_eshop.users.is_admin =1`
      );
      console.log(`Retrieved ${result.length} rows from the database`);
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    } catch (err) {
      console.error('Failed to fetch admins from database:', err);
      res
        .status(500)
        .send(
          '500 - Internal Server Error. Failed to fetch admins from database'
        );
    } finally {
      if (connection) await connection.release();
    }
  },

  // REGISTER ADMIN
  createAdmin: async (req, res) => {
    // Get the request input
    let { firstname, lastname, username, email, password } = req.body;
    let is_admin = 1;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    let connection;
    try {
      connection = await pool.getConnection();
      let result = await connection.execute(
        `INSERT INTO tattoo_eshop.users (firstname, lastname, username, email, password, is_admin) VALUES (?, ?, ?, ?, ?, ?)`,
        [firstname, lastname, username, email, hashedPassword, is_admin]
      );
      let userId = result.insertId;
      res.setHeader('Content-Type', 'application/json');
      res.send({
        id: Number(userId),
        firstname,
        lastname,
        username,
        email,
        password,
        is_admin,
      });
    } catch (err) {
      console.error('Failed to create new admin in the database:', err);
      res
        .status(500)
        .send(
          '500 - Internal Server Error. Failed to create new admin in the database'
        );
    } finally {
      if (connection) await connection.release();
    }
  },

  // end of controller
};

// Export the controller
module.exports = adminController;
