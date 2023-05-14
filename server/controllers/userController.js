// Imports
const pool = require('../configs/db.js');
const bcrypt = require('bcrypt');

// Controllers
const userController = {
  // Show all users that are not admins
  // This is available to admins only
  getAllUsers: async (req, res) => {
    let connection;
    try {
      connection = await pool.getConnection();
      let result = await connection.query(
        `SELECT * FROM tattoo_eshop.users WHERE tattoo_eshop.users.is_admin =0`
      );
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

  // Show user profile / admin profile
  getOne: async (req, res) => {
    let connection;
    let userId = req.params.userId;
    try {
      connection = await pool.getConnection();

      let result = await connection.query(
        `SELECT * FROM tattoo_eshop.users WHERE id = ?`,
        [userId]
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

  // Show user's posts / admin's posts
  getUserPosts: async (req, res) => {
    let connection;
    let userId = req.params.userId;
    try {
      connection = await pool.getConnection();

      // Query to fetch user information (it will be useful for frontend, so the user's info can be shown on top of page for example)
      let userResult = await connection.query(
        `SELECT * FROM tattoo_eshop.users WHERE id = ?`,
        [userId]
      );

      // Query to fetch user's posts
      let postsResult = await connection.query(
        `SELECT * FROM tattoo_eshop.posts WHERE user_id = ?`,
        [userId]
      );

      // Combine results
      let result = {
        user: userResult[0],
        posts: postsResult,
      };

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

  // Update user's profile / admin's profile
  update: async (req, res) => {
    // Get the request input
    let { firstname, lastname, username, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    let userId = req.params.userId;
    let connection;
    try {
      connection = await pool.getConnection();
      await connection.execute(
        `UPDATE tattoo_eshop.users SET firstname=?, lastname=?, username=?, email=?, password=? WHERE id=?`,
        [firstname, lastname, username, email, hashedPassword, userId]
      );
      let result = {
        id: Number(userId),
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

  // Delete user's profile / admin's profile
  delete: async (req, res) => {
    let connection;
    let userId = req.params.userId;
    try {
      connection = await pool.getConnection();
      let stmt = await connection.prepare(
        `DELETE FROM tattoo_eshop.users WHERE id = ?`,
        [userId]
      );
      await stmt.execute(userId);
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

  // end of controller
};

// Export the controller
module.exports = userController;
