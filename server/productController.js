// Core modules
const pool = require('./db.js');

// Controllers
const productController = {
  // Show all products (tattoos)
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
      // throw err;
    } finally {
      // if (connection) connection.end();
      if (connection) await connection.release();
    }
  },

  // Show selected product
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

  // Delete selected product
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

  //   // Create new product
  // create:async (req, res) => {
  // let connection;
  // try {
  //   connection = await pool.getConnection();

  //     let {title, description, image, price_in_EUR}

  //     let productId = req.params.id;
  //     let data = await connection.query(
  //       `SELECT title, description, image, price_in_EUR FROM tattoo_collection.tattoos WHERE id=?`,
  //       [productId]
  //     );
  //     res.send(data);
  //   } catch (err) {
  //     console.error('Failed to fetch record in the database:', err);
  //     res
  //     .status(500)
  //     .send('500 - Internal Server Error. Failed to fetch record in the database');
  //   } finally {
  //     if (connection) await connection.release();
  //   }
  // },

  // Update selected product
  // updateProduct: async (req, res) => {
  //   let connection;
  //   try {
  //     connection = await pool.getConnection();
  //     let productId = req.params.id;
  //     const data = await connection.query(
  //       `UPDATE tattoos SET title=?, description=?, price_in_EUR=? WHERE id=?` [title, description, new Date(), id],
  //       [productId]
  //     );
  //     res.send(data);
  //   } catch (err) {
  //     throw err;
  //   } finally {
  //     if (connection) connection.end();
  //   }
  // },
};

// Export the controllers
module.exports = productController;

// res.status(200).send({
//   statusCode: 200,
//   status: 'OK',
//   message: 'Idea deleted successfully',
// });
