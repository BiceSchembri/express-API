// Core modules
const pool = require('./db.js');

// Product controllers
const productController = {
  getProducts: async (req, res) => {
    let connection;
    try {
      connection = await pool.getConnection();
      const data = await connection.query(
        `SELECT title, description, price_in_EUR FROM tattoo_collection.tattoos`
      );
      res.send(data);
    } catch (err) {
      throw err;
    } finally {
      if (connection) connection.end();
    }
  },
};

module.exports = productController;
