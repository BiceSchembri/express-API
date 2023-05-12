const pool = require('../configs/db.js');

const postAuthorization = async (req, res, next) => {
  let connection;

  try {
    let postId = req.params.postId;
    let userId = req.user.id;

    connection = await pool.getConnection();
    let result = await connection.query(
      `SELECT * FROM tattoo_eshop.posts WHERE id=? AND user_id=?`,
      [postId, userId]
    );
    if (!result.length) {
      return res.status(401).send('Not authorized to modify this post');
    }
    next();
  } catch (err) {
    return res
      .status(401)
      .send('There was an error. You are not authorized to modify this post');
  } finally {
    if (connection) await connection.release();
  }
};

module.exports = postAuthorization;
