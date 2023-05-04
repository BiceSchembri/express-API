// Imports
const pool = require('../configs/db.js');

// Controllers
const productController = {
  // Show all records (eshop products / tattoos)
  getAll: async (req, res) => {
    let connection;
    try {
      connection = await pool.getConnection();
      let result = await connection.query(
        `SELECT title, description, image, price_in_EUR FROM tattoo_eshop.tattoos`
      );
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

  // Show selected record
  getOne: async (req, res) => {
    let connection;
    try {
      connection = await pool.getConnection();
      let id = req.params.id;
      let result = await connection.query(
        `SELECT title, description, image, price_in_EUR FROM tattoo_eshop.tattoos WHERE id=?`,
        [id]
      );
      console.log(`Retrieved record with id#${id} from the database`);
      // if (!result.affectedRows) {
      //   console.log('Record not found');
      //   res.status(404).send('Record not found');
      // } else {
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
      // }
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
    try {
      connection = await pool.getConnection();
      let id = req.params.id;
      let stmt = await connection.prepare(
        `DELETE FROM tattoo_eshop.tattoos WHERE id = ?`,
        [id]
      );
      let result = await stmt.execute(id);
      if (!result.affectedRows) {
        console.log('Record not found');
        res.status(404).send('Record not found');
      } else {
        res.send('Record deleted successfully');
      }
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
  update: async (req, res) => {
    // Get the request input
    let { title, description, image, price_in_EUR } = req.body;
    let id = req.params.id;
    let connection;
    try {
      connection = await pool.getConnection();
      await connection.execute(
        `UPDATE tattoo_eshop.tattoos SET title=?, description=?, image=?, price_in_EUR=? WHERE id=?`,
        [title, description, image || null, price_in_EUR, id]
      );
      let result = {
        id: Number(id),
        title,
        description,
        image,
        price_in_EUR,
      };
      // if (!result.affectedRows) {
      //   console.log('Record not found');
      //   res.status(404).send('Record not found');
      // } else {
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
      // }
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

// res.status(200).send({
//   statusCode: 200,
//   status: 'OK',
//   message: 'Idea deleted successfully',
// });
