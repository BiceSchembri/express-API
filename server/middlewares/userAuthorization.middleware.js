const pool = require('../configs/db.js');

const userAuthorization = async (req, res, next) => {
  let connection;

  try {
    // let userId = req.params.userId;
    let id = req.user.id;

    connection = await pool.getConnection();
    let result = await connection.query(
      `SELECT * FROM tattoo_eshop.users WHERE id=?`,
      [id]
    );
    if (!result.length) {
      return res.status(401).send('Not authorized to see this page');
    }
    next();
  } catch (err) {
    return res
      .status(401)
      .send('There was an error. You are not authorized to see this page');
  } finally {
    if (connection) await connection.release();
  }
};

module.exports = userAuthorization;
