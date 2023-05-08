// Imports
const pool = require('../configs/db.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Controllers
const userController = {
  // Show all users
  getAll: async (req, res) => {
    let connection;
    try {
      connection = await pool.getConnection();
      let result = await connection.query(`SELECT * FROM tattoo_eshop.users`);
      console.log(`Retrieved ${result.length} rows from the database`);
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    } catch (err) {
      console.error('Failed to fetch users from database:', err);
      res
        .status(500)
        .send(
          '500 - Internal Server Error. Failed to fetch users from database'
        );
    } finally {
      if (connection) await connection.release();
    }
  },

  // Show selected record
  getOne: async (req, res) => {
    let connection;
    let id = req.params.id;
    try {
      connection = await pool.getConnection();
      let result = await connection.query(
        `SELECT * FROM tattoo_eshop.users WHERE id=?`,
        [id]
      );
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    } catch (err) {
      console.error('Failed to fetch user from database:', err);
      res
        .status(500)
        .send(
          '500 - Internal Server Error. Failed to fetch user from database'
        );
    } finally {
      if (connection) await connection.release();
    }
  },

  // Delete selected record
  delete: async (req, res) => {
    let connection;
    let id = req.params.id;
    try {
      connection = await pool.getConnection();
      let stmt = await connection.prepare(
        `DELETE FROM tattoo_eshop.users WHERE id = ?`,
        [id]
      );
      await stmt.execute(id);
      res.send('User deleted successfully');
    } catch (err) {
      console.error('Failed to delete user from database:', err);
      res
        .status(500)
        .send(
          '500 - Internal Server Error. Failed to delete user from database'
        );
    } finally {
      if (connection) await connection.release();
    }
  },

  // Show create form page (dummy data)
  // createPage: async (req, res) => {
  //   res.send('On this page you will find a form to create a new user');
  // },

  //  Create new record
  create: async (req, res) => {
    // Get the request input
    let { firstname, lastname, username, email, password } = req.body;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    let connection;
    try {
      connection = await pool.getConnection();
      let result = await connection.execute(
        `INSERT INTO tattoo_eshop.users (firstname, lastname, username, email, password) VALUES (?, ?, ?, ?, ?)`,
        [firstname, lastname, username, email, hashedPassword]
      );
      let id = result.insertId;
      res.setHeader('Content-Type', 'application/json');
      res.send({
        id: Number(id),
        firstname,
        lastname,
        username,
        email,
        password,
      });
    } catch (err) {
      console.error('Failed to create new user in the database:', err);
      res
        .status(500)
        .send(
          '500 - Internal Server Error. Failed to create new user in the database'
        );
    } finally {
      if (connection) await connection.release();
    }
  },

  // Update selected record
  update: async (req, res) => {
    // Get the request input
    let { firstname, lastname, username, email, password } = req.body;
    let id = req.params.id;
    let connection;
    try {
      connection = await pool.getConnection();
      await connection.execute(
        `UPDATE tattoo_eshop.users SET firstname=?, lastname=?, username=?, email=?, password=? WHERE id=?`,
        [firstname, lastname, username, email, password, id]
      );
      let result = {
        id: Number(id),
        firstname,
        lastname,
        username,
        email,
        password,
      };
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    } catch (err) {
      console.error('Failed to update user in the database:', err);
      res
        .status(500)
        .send(
          '500 - Internal Server Error. Failed to update user in the database'
        );
    } finally {
      if (connection) await connection.release();
    }
  },
};

// Export the controllers
module.exports = userController;
