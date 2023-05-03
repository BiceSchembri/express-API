// Core modules
const pool = require('./db.js');

// Controllers
const productController = {
  // Show all records (eshop products / tattoos)
  getAll: async (req, res) => {
    let connection;
    try {
      connection = await pool.getConnection();
      let data = await connection.query(
        `SELECT title, description, image, price_in_EUR FROM tattoo_collection.tattoos`
      );
      console.log(`Retrieved ${data.length} rows from the database`);
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    } catch (err) {
      console.error('Failed to fetch records from database:', err);
      res
        .status(500)
        .send(
          '500 - Internal Server Error. Failed to fetch records from database'
        );
    } finally {
      if (connection) await connection.release();
    }
  },

  // Show selected record
  getOne: async (req, res) => {
    let connection;
    try {
      connection = await pool.getConnection();
      let id = req.params.id;
      let data = await connection.query(
        `SELECT title, description, image, price_in_EUR FROM tattoo_collection.tattoos WHERE id=?`,
        [id]
      );
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    } catch (err) {
      console.error('Failed to fetch record in the database:', err);
      res
        .status(500)
        .send(
          '500 - Internal Server Error. Failed to fetch record in the database'
        );
    } finally {
      if (connection) await connection.release();
    }
  },

  // Delete selected record
  delete: async (req, res) => {
    let connection;
    try {
      connection = await pool.getConnection();
      let id = req.params.id;
      let stmt = await connection.prepare(
        `DELETE FROM tattoo_collection.tattoos WHERE id = ?`,
        [id]
      );
      let result = await stmt.execute(id);
      if (result.affectedRows === 0) {
        res.status(404).send('Record not found');
      } else {
        res.send('Record deleted successfully');
      }
    } catch (err) {
      console.error('Failed to delete record from the database:', err);
      res
        .status(500)
        .send(
          '500 - Internal Server Error. Failed to delete record from the database'
        );
    } finally {
      if (connection) await connection.release();
    }
  },

  //  Create new record
  create: async (req, res) => {
    // Get the request input
    let { title, description, image, price_in_EUR } = req.body;
    // Check that required fields are not empty
    if (!title || !description || !price_in_EUR) {
      let err = new Error('Title, description and price cannot be empty');
      res.status(400).send(err.message);
      return;
    }
    let connection;
    try {
      connection = await pool.getConnection();
      let result = await connection.execute(
        `INSERT INTO tattoo_collection.tattoos (title, description, image, price_in_EUR) VALUES (?, ?, ?, ?)`,
        [title, description, image, price_in_EUR]
      );
      let id = result.insertId;
      res.setHeader('Content-Type', 'application/json');
      res.send({ id: Number(id), title, description, image, price_in_EUR });
    } catch (err) {
      console.error('Failed to create new record in the database:', err);
      res
        .status(500)
        .send(
          '500 - Internal Server Error. Failed to create new record in the database'
        );
    } finally {
      if (connection) await connection.release();
    }
  },

  // Update selected record
  //   update: async (req, res) => {
  //     let connection;
  // try {
  //     connection = await pool.getConnection();
  //     const {title, description} = req.body;
  //     if (!title || !description) {
  //         throw new Error("title and description are required");
  //     }
  //     await connection.query(
  //         `INSERT INTO brilliant_minds.ideas (title, description) VALUES (?, ?)`,
  //         [title, description]
  //     );
  //     res.status(200);
  // } catch (err) {
  //     throw err;
  // } finally {
  //     if(connection) connection.end();
  // }
  // },
};

// Export the controllers
module.exports = productController;

// res.status(200).send({
//   statusCode: 200,
//   status: 'OK',
//   message: 'Idea deleted successfully',
// });