const pool = require('../configs/db.js');

const commentAuthorization = async (req, res, next) => {
  let connection;

  try {
    let commentId = req.params.commentId;
    let userId = req.user.id;

    connection = await pool.getConnection();
    let result = await connection.query(
      `SELECT * FROM tattoo_eshop.comments WHERE id=? AND user_id=?`,
      [commentId, userId]
    );
    if (!result.length) {
      return res.status(401).send('Not authorized to modify this comment');
    }
    next();
  } catch (err) {
    return res
      .status(401)
      .send(
        'There was an error. You are not authorized to modify this comment'
      );
  } finally {
    if (connection) await connection.release();
  }
};

module.exports = commentAuthorization;
