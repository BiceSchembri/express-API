// Imports
const pool = require('../configs/db.js');

const commentNotFound = async (req, res, next) => {
  let connection;
  let commentId = req.params.commentId;
  try {
    connection = await pool.getConnection();
    let result = await connection.query(
      `SELECT * FROM tattoo_eshop.comments WHERE id=?`,
      [commentId]
    );
    if (!result.length) {
      console.log('Comment not found, sorry');
      res.status(404).send('Comment not found, sorry');
    } else {
      next();
    }
  } catch (err) {
    console.error('Failed to fetch comment from database:', err, 'sorry');
    res
      .status(500)
      .send(
        '500 - Internal Server Error. Failed to fetch comment from database. Sorry'
      );
  } finally {
    if (connection) await connection.release();
  }
};

module.exports = commentNotFound;
