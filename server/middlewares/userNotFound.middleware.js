// Imports
const pool = require('../configs/db.js');

const userNotFound = async (req, res, next) => {
  let connection;
  let id = req.params.id;
  try {
    connection = await pool.getConnection();
    let result = await connection.query(
      `SELECT * FROM tattoo_eshop.users WHERE id=?`,
      [id]
    );
    if (!result.length) {
      console.log('User not found, sorry');
      res.status(404).send('User not found, sorry');
    } else {
      next();
    }
  } catch (err) {
    console.error('Failed to fetch user record from database:', err, 'sorry');
    res
      .status(500)
      .send(
        '500 - Internal Server Error. Failed to fetch user record from database. Sorry'
      );
  } finally {
    if (connection) await connection.release();
  }
};

module.exports = userNotFound;
