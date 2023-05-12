// Imports
const pool = require('../configs/db.js');

// Controllers
const productController = {
  // Show all products
  getAll: async (req, res) => {
    let connection;
    try {
      connection = await pool.getConnection();
      let result = await connection.query(`SELECT * FROM tattoo_eshop.tattoos`);
      console.log(`Retrieved ${result.length} rows from the database`);
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
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

  // Show selected product
  getOne: async (req, res) => {
    let connection;
    let productId = req.params.productId;
    try {
      connection = await pool.getConnection();
      let result = await connection.query(
        `SELECT * FROM tattoo_eshop.tattoos WHERE id=?`,
        [productId]
      );
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    } catch (err) {
      console.error('Failed to fetch record from database:', err);
      res
        .status(500)
        .send(
          '500 - Internal Server Error. Failed to fetch record from database'
        );
    } finally {
      if (connection) await connection.release();
    }
  },

  // Delete selected record
  delete: async (req, res) => {
    let connection;
    let productId = req.params.productId;
    try {
      connection = await pool.getConnection();
      let stmt = await connection.prepare(
        `DELETE FROM tattoo_eshop.tattoos WHERE id = ?`,
        [productId]
      );
      await stmt.execute(productId);
      res.send('Record deleted successfully');
    } catch (err) {
      console.error('Failed to delete record from database:', err);
      res
        .status(500)
        .send(
          '500 - Internal Server Error. Failed to delete record from database'
        );
    } finally {
      if (connection) await connection.release();
    }
  },

  // Show create form page (dummy data)
  // createPage: async (req, res) => {
  //   res.send('On this page you will find a form to create a new record');
  // },

  //  Create new record
  create: async (req, res) => {
    // Get the request input
    let { title, description, image, price_in_EUR } = req.body;
    let connection;
    try {
      connection = await pool.getConnection();
      let result = await connection.execute(
        `INSERT INTO tattoo_eshop.tattoos (title, description, image, price_in_EUR) VALUES (?, ?, ?, ?)`,
        [title, description, image, price_in_EUR]
      );
      let product = result.insertId;
      res.setHeader('Content-Type', 'application/json');
      res.send({
        id: Number(productId),
        title,
        description,
        image,
        price_in_EUR,
      });
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
  update: async (req, res) => {
    // Get the request input
    let { title, description, image, price_in_EUR } = req.body;
    let productId = req.params.productId;
    let connection;
    try {
      connection = await pool.getConnection();
      await connection.execute(
        `UPDATE tattoo_eshop.tattoos SET title=?, description=?, image=?, price_in_EUR=? WHERE id=?`,
        [title, description, image || null, price_in_EUR, productId]
      );
      let result = {
        id: Number(productId),
        title,
        description,
        image,
        price_in_EUR,
      };
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    } catch (err) {
      console.error('Failed to update record in the database:', err);
      res
        .status(500)
        .send(
          '500 - Internal Server Error. Failed to update record in the database'
        );
    } finally {
      if (connection) await connection.release();
    }
  },
};

// Export the controllers
module.exports = productController;
