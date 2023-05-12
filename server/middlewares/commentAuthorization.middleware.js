const pool = require('../configs/db.js');
const jwt = require('jsonwebtoken');
const jwt_token = process.env.JWT_ACCESS_TOKEN;

const commentAuthorization = async (req, res, next) => {
  let connection;

  try {
    // Get user ID from JWT token
    const cookie = req.cookies['tattoo_eshop.process'];
    const decodedToken = jwt.verify(cookie, jwt_token);
    const isAdmin = decodedToken.isAdmin;

    // Get user id from logged in user, comment id from request parameters
    let commentId = req.params.commentId;
    let userId = req.user.id;

    connection = await pool.getConnection();
    let result = await connection.query(
      `SELECT * FROM tattoo_eshop.comments WHERE id=? AND user_id=?`,
      [commentId, userId]
    );

    // Check if user is authorized or has admin privileges
    if (!result.length && isAdmin !== 1) {
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
