// Imports
const pool = require('../configs/db.js');
const bcrypt = require('bcrypt');
// const saltRounds = 10;
const jwt = require('jsonwebtoken');
const jwt_token = process.env.JWT_ACCESS_TOKEN;

// Controllers
const sessionController = {
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
      let userId = result.insertId;
      res.setHeader('Content-Type', 'application/json');
      res.send({
        id: Number(userId),
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

  // Show form to login
  showLogin: (req, res) => {
    res.send('this will be the form to login');
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

      // check if user exists
      if (!user) {
        console.log('User not found');
        return res.send('Sorry, these credentials could not be verified');
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        return res.send('Incorrect credentials');
      }

      const accessToken = jwt.sign(
        { id: user.id, email: user.email, isAdmin: user.is_admin },
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
      res.status(500).send('Incorrect credentials, cannot authenticate');
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
module.exports = sessionController;
