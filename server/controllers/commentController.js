// Imports
const pool = require('../configs/db.js');

// Controllers
const commentController = {
  // Show all comments - not really needed
  // getAll: async (req, res) => {
  //   let connection;
  //   let postId = req.params.postId;
  //   console.log(`req.params.postId = ${req.params.postId}`);
  //   try {
  //     connection = await pool.getConnection();
  //     let result = await connection.query(
  //       `SELECT * FROM tattoo_eshop.comments WHERE post_id=?`,
  //       [postId]
  //     );
  //     console.log(`Retrieved ${result.length} comments from the database`);
  //     res.setHeader('Content-Type', 'application/json');
  //     res.send(result);
  //   } catch (err) {
  //     console.error('Failed to fetch comments from database:', err);
  //     res
  //       .status(500)
  //       .send(
  //         '500 - Internal Server Error. Failed to fetch comments from database'
  //       );
  //   } finally {
  //     if (connection) await connection.release();
  //   }
  // },

  // Show comment
  getOne: async (req, res) => {
    let connection;
    let postId = req.params.postId;
    let commentId = req.params.commentId;
    try {
      connection = await pool.getConnection();
      let result = await connection.query(
        `SELECT * FROM tattoo_eshop.comments WHERE id=? AND post_id=?`,
        [commentId, postId]
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
    let { body } = req.body;
    let userId = req.user.id;
    let postId = req.params.postId;
    let connection;
    try {
      connection = await pool.getConnection();
      let result = await connection.execute(
        `INSERT INTO tattoo_eshop.comments (post_id, user_id, body) VALUES (?, ?, ?)`,
        [postId, userId, body]
      );
      let commentId = result.insertId;
      res.setHeader('Content-Type', 'application/json');
      res.send({ id: Number(commentId), postId, userId, body });
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
    let commentId = req.params.commentId;
    let connection;
    try {
      connection = await pool.getConnection();
      await connection.execute(
        `UPDATE tattoo_eshop.comments SET body=? WHERE id=?`,
        [body, commentId]
      );
      let result = {
        id: Number(commentId),
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
    let commentId = req.params.commentId;
    try {
      connection = await pool.getConnection();
      let stmt = await connection.prepare(
        `DELETE FROM tattoo_eshop.comments WHERE id = ?`,
        [commentId]
      );
      await stmt.execute(commentId);
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
