// Imports
const pool = require('../configs/db.js');

// Controllers
const commentController = {
  // Show all comments
  getAll: async (req, res) => {
    let connection;
    let postId = req.params.id;
    console.log(`req.params.id = ${req.params.id}`);
    try {
      connection = await pool.getConnection();
      let result = await connection.query(
        `SELECT * FROM tattoo_eshop.comments WHERE post_id=?`,
        [postId]
      );
      console.log(`Retrieved ${result.length} comments from the database`);
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    } catch (err) {
      console.error('Failed to fetch comments from database:', err);
      res
        .status(500)
        .send(
          '500 - Internal Server Error. Failed to fetch comments from database'
        );
    } finally {
      if (connection) await connection.release();
    }
  },

  // Show comment
  getOne: async (req, res) => {
    let connection;
    let id = req.params.id;
    try {
      connection = await pool.getConnection();
      let result = await connection.query(
        `SELECT * FROM tattoo_eshop.comments WHERE id=?`,
        [id]
      );
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    } catch (err) {
      console.error('Failed to fetch comment from database:', err);
      res
        .status(500)
        .send(
          '500 - Internal Server Error. Failed to fetch comment from database'
        );
    } finally {
      if (connection) await connection.release();
    }
  },

  //  Add comment
  create: async (req, res) => {
    // Get the request input
    let { post_id, user_id, body } = req.body;
    let connection;
    try {
      connection = await pool.getConnection();
      let result = await connection.execute(
        `INSERT INTO tattoo_eshop.comments (post_id, user_id, body) VALUES (?, ?, ?)`,
        [post_id, user_id, body]
      );
      let id = result.insertId;
      res.setHeader('Content-Type', 'application/json');
      res.send({ id: Number(id), post_id, user_id, body });
    } catch (err) {
      console.error('Failed to create new comment:', err);
      res
        .status(500)
        .send('500 - Internal Server Error. Failed to create new comment');
    } finally {
      if (connection) await connection.release();
    }
  },

  // Update comment
  update: async (req, res) => {
    // Get the request input
    let { body } = req.body;
    let id = req.params.id;
    let connection;
    try {
      connection = await pool.getConnection();
      await connection.execute(
        `UPDATE tattoo_eshop.comments SET body=? WHERE id=?`,
        [body, id]
      );
      let result = {
        id: Number(id),
        body,
      };
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    } catch (err) {
      console.error('Failed to update comment:', err);
      res
        .status(500)
        .send('500 - Internal Server Error. Failed to update comment');
    } finally {
      if (connection) await connection.release();
    }
  },

  // Delete comment
  delete: async (req, res) => {
    let connection;
    let id = req.params.id;
    try {
      connection = await pool.getConnection();
      let stmt = await connection.prepare(
        `DELETE FROM tattoo_eshop.comments WHERE id = ?`,
        [id]
      );
      await stmt.execute(id);
      res.send('Comment deleted successfully');
    } catch (err) {
      console.error('Failed to delete comment:', err);
      res
        .status(500)
        .send('500 - Internal Server Error. Failed to delete comment');
    } finally {
      if (connection) await connection.release();
    }
  },
};

// Export the controllers
module.exports = commentController;
