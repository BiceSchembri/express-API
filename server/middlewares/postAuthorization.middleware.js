const pool = require('../configs/db.js');
const jwt = require('jsonwebtoken');
const jwt_token = process.env.JWT_ACCESS_TOKEN;

const postAuthorization = async (req, res, next) => {
  let connection;

  try {
    // Get user ID from JWT token
    const cookie = req.cookies['tattoo_eshop.process'];
    const decodedToken = jwt.verify(cookie, jwt_token);
    const isAdmin = decodedToken.isAdmin;

    // Get user id from logged in user, post id from request parameters
    let postId = req.params.postId;
    let userId = req.user.id;

    connection = await pool.getConnection();
    let result = await connection.query(
      `SELECT * FROM tattoo_eshop.posts WHERE id=? AND user_id=?`,
      [postId, userId]
    );

    // Check if user is authorized or has admin privileges
    if (!result.length && !isAdmin !== 1) {
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
