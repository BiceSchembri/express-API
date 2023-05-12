// Imports
const pool = require('../configs/db.js');

const isAdmin = async (req, res, next) => {
  let connection;
  let userId = req.user.id;
  try {
    connection = await pool.getConnection();
    let result = await connection.query(
      `SELECT * FROM tattoo_eshop.users WHERE id=? AND is_admin=1`,
      [userId]
    );
    if (!result.length) {
      console.log('Not authenticated as admin');
      res.status(401).send('You must be logged in as admin');
    } else {
      next();
    }
  } catch (err) {
    console.error('Server / database connection error:', err);
    res
      .status(500)
      .send('500 - Internal Server Error. Failed to connect to database');
  } finally {
    if (connection) await connection.release();
  }
};

module.exports = isAdmin;
