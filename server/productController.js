// Core modules
const pool = require('./db.js');

// Controllers
const productController = {
  // Show all products (tattoos)
  getProducts: async (req, res) => {
    let connection;
    try {
      connection = await pool.getConnection();
      let data = await connection.query(
        `SELECT title, description, price_in_EUR FROM tattoo_collection.tattoos`
      );
      res.send(data);
    } catch (err) {
      throw err;
    } finally {
      if (connection) connection.end();
    }
  },

  // Show selected product
  getProduct: async (req, res) => {
    let connection;
    try {
      connection = await pool.getConnection();
      let productId = req.params.id;
      const data = await connection.query(
        `SELECT title, description, price_in_EUR FROM tattoo_collection.tattoos WHERE id=?`,
        [productId]
      );
      res.send(data);
    } catch (err) {
      throw err;
    } finally {
      if (connection) connection.end();
    }
  },
  // Update selected product

  // Delete selected product
};

// Export the controllers
module.exports = productController;
