// Imports
const pool = require('../configs/db.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
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

  // SHOW USER
  getOne: async (req, res) => {
    let connection;
    let id = req.params.id;
    try {
      connection = await pool.getConnection();

      // Get user ID from JWT token
      const cookie = req.cookies['tattoo_eshop.process'];
      const decodedToken = jwt.verify(cookie, jwt_token);
      const userId = decodedToken.id;

      // Check if the user ID in the request parameters matches the ID in the JWT token
      if (userId != id) {
        return res.status(401).send('Not authorized to see this page');
      }

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

  //  REGISTER USER
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

  //  LOGIN
  login: async (req, res) => {
    // Get the request input
    let email = req.body.email;
    let password = req.body.password;

    let connection;
    try {
      connection = await pool.getConnection();

      let user = await connection.query(
        `SELECT * FROM tattoo_eshop.users WHERE email=? LIMIT 1`,
        [email]
      );

      user = user[0];

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        return res.send('Incorrect credentials');
      }

      const accessToken = jwt.sign(
        { id: user.id, email: user.email },
        jwt_token
      );

      // set the token as a cookie
      res.cookie('tattoo_eshop.process', accessToken, {
        httpOnly: true, // prevents JavaScript from accessing the cookie
        // secure: true, // only sends the cookie over HTTPS
        // sameSite: 'strict', // prevents CSRF attacks
        maxAge: 24 * 60 * 60 * 1000, // expires in 24 hours
      });
      res.status(200).send('Successfully logged in');
    } catch (err) {
      console.error('Incorrect credentials', err);
      res.status(500).send('403 - Incorrect credentials, cannot authenticate');
    } finally {
      if (connection) await connection.release();
    }
  },

  // LOGOUT
  logout: async (req, res) => {
    try {
      // Clear cookie / session token and any session data
      res.clearCookie('tattoo_eshop.process');
      res.status(200).json({ message: 'Successfully logged out' });
    } catch (err) {
      console.error('Error logging out:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // end of controller
};

// Export the controller
module.exports = userController;
