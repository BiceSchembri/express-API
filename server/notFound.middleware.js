// Imports
const pool = require('./db.js');

const notFound = async (req, res, next) => {
  let connection;
  try {
    connection = await pool.getConnection();
    let id = req.params.id;
    let result = await connection.query(
      `SELECT * FROM tattoo_eshop.tattoos WHERE id=?`,
      [id]
    );
    if (!result.affectedRows) {
      console.log('Record not found');
      res.status(404).send('Record not found');
      return;
    }
    next();
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
};

module.exports = notFound;
