// Imports
const pool = require('../configs/db.js');

const postNotFound = async (req, res, next) => {
  let connection;
  let postId = req.params.postId;
  try {
    connection = await pool.getConnection();
    let result = await connection.query(
      `SELECT * FROM tattoo_eshop.posts WHERE id=?`,
      [postId]
    );
    if (!result.length) {
      console.log('Post not found, sorry');
      res.status(404).send('Post not found, sorry');
    } else {
      next();
    }
  } catch (err) {
    console.error('Failed to fetch post from database:', err, 'sorry');
    res
      .status(500)
      .send(
        '500 - Internal Server Error. Failed to fetch post from database. Sorry'
      );
  } finally {
    if (connection) await connection.release();
  }
};

module.exports = postNotFound;
