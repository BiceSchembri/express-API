// Imports
const pool = require('../configs/db.js');
const bcrypt = require('bcrypt');
// const saltRounds = 10;
const jwt = require('jsonwebtoken');
const jwt_token = process.env.JWT_ACCESS_TOKEN;

// Controllers
const userController = {
  // SHOW ALL USERS
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

  // Show user profile
  getOne: async (req, res) => {
    let connection;
    let id = req.params.id;
    try {
      connection = await pool.getConnection();

      // // Query to fetch user information
      // let userResult = await connection.query(
      //   `SELECT * FROM tattoo_eshop.users WHERE id = ?`,
      //   [id]
      // );

      // // Query to fetch user's posts
      // let postsResult = await connection.query(
      //   `SELECT * FROM tattoo_eshop.posts WHERE user_id = ?`,
      //   [id]
      // );

      // // Combine results
      // let result = {
      //   user: userResult[0],
      //   posts: postsResult,
      // };

      let result = await connection.query(
        `SELECT * FROM tattoo_eshop.users WHERE id = ?`,
        [id]
      );

      res.setHeader('Content-Type', 'application/json');
      return res.send(result);
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

  // SHOW USER
  getUserPosts: async (req, res) => {
    let connection;
    let id = req.params.id;
    try {
      connection = await pool.getConnection();

      // Query to fetch user's posts
      let result = await connection.query(
        `SELECT * FROM tattoo_eshop.posts WHERE user_id = ?`,
        [id]
      );

      res.setHeader('Content-Type', 'application/json');
      return res.send(result);
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

  // DELETE USER
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

  // UPDATE USER
  update: async (req, res) => {
    // Get the request input
    let { firstname, lastname, username, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    let id = req.params.id;
    let connection;
    try {
      connection = await pool.getConnection();
      await connection.execute(
        `UPDATE tattoo_eshop.users SET firstname=?, lastname=?, username=?, email=?, password=? WHERE id=?`,
        [firstname, lastname, username, email, hashedPassword, id]
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

  // end of controller
};

// Export the controller
module.exports = userController;
