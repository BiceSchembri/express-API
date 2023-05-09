// Imports
const pool = require('../configs/db.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const jwt_token = process.env.JWT_ACCESS_TOKEN;

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

  // Show user
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

  // Delete user
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

  //  REGISTER - Create new user
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

  // Update user
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

  // //  LOGIN - User login
  // login: async (req, res) => {
  //   // Get the request input
  //   let email = req.body.email;
  //   let password = req.body.password;

  //   let connection;
  //   try {
  //     connection = await pool.getConnection();

  //     let user = await connection.query(
  //       `SELECT * FROM tattoo_eshop.users WHERE email= ? LIMIT 1`,
  //       [email]
  //     );

  //     user = user[0];

  //     console.log(user);

  //     // Check if user exists
  //     if (!user) {
  //       console.log('User not found');
  //       return res.send('Sorry, these credentials could not be verified');
  //     } else {
  //       // Check if password is correct
  //       const isPasswordCorrect = await bcrypt.compare(password, user.password);

  //       if (!isPasswordCorrect) {
  //         res.status(403).send('Incorrect credentials');
  //       } else {
  //         // Delete password from session after checking it
  //         delete user.password;

  //         // Generate JWT token
  //         const accessToken = jwt.sign({ email }, jwt_token);

  //         // Set the token as a cookie
  //         res.cookie('tattoo_eshop.process', accessToken, {
  //           httpOnly: true, // prevents JavaScript from accessing the cookie
  //           // secure: true, // only sends the cookie over HTTPS
  //           // sameSite: 'strict', // prevents CSRF attacks
  //           // // maxAge: 24 * 60 * 60 * 1000, // expires in 24 hours
  //           // maxAge: 10 * 1000, // expires in 1 second
  //         });
  //         res.status(200).json({ message: 'Successfully logged in' });
  //       }
  //     }
  //   } catch (err) {
  //     console.error('Incorrect credentials', err);
  //     res.status(500).send('403 - incorrect credentials, cannot authenticate');
  //   } finally {
  //     if (connection) await connection.release();
  //   }
  // },

  //  LOGIN - User login
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
        res.send('Sorry, these credentials could not be verified');
      } else {
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
          res.send('Incorrect credentials');
        } else {
          const accessToken = jwt.sign({ email }, jwt_token);

          // set the token as a cookie
          res.cookie('tattoo_eshop.process', accessToken, {
            httpOnly: true, // prevents JavaScript from accessing the cookie
            secure: true, // only sends the cookie over HTTPS
            sameSite: 'strict', // prevents CSRF attacks
            maxAge: 24 * 60 * 60 * 1000, // expires in 24 hours
          });

          res.status(200).json({ message: 'Successfully logged in' });
        }
      }
    } catch (err) {
      console.error('Incorrect credentials', err);
      res.status(500).send('403 - incorrect credentials, cannot authenticate');
    } finally {
      if (connection) await connection.release();
    }
  },

  addRoute: async (req, res) => {
    res.send('you are logged in');
    res.redirect('/');
  },

  // end of controller
};

// Export the controller
module.exports = userController;
