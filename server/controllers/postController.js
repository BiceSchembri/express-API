// Imports
const pool = require('../configs/db.js');

// Controllers
const postController = {
  // Show all posts
  getAll: async (req, res) => {
    let connection;
    try {
      connection = await pool.getConnection();
      let result = await connection.query(`SELECT * FROM tattoo_eshop.posts`);
      console.log(`Retrieved ${result.length} posts from the database`);
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    } catch (err) {
      console.error('Failed to fetch posts from database:', err);
      res
        .status(500)
        .send(
          '500 - Internal Server Error. Failed to fetch posts from database'
        );
    } finally {
      if (connection) await connection.release();
    }
  },

  // Show post with related comments
  getOne: async (req, res) => {
    let connection;
    let postId = req.params.postId;
    try {
      connection = await pool.getConnection();
      let postResult = await connection.query(
        `SELECT * FROM tattoo_eshop.posts WHERE id=?`,
        [postId]
      );
      let commentResult = await connection.query(
        `SELECT * FROM tattoo_eshop.comments WHERE post_id=?`,
        [postId]
      );
      let result = { postResult, commentResult };
      console.log(result);
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    } catch (err) {
      console.error('Failed to fetch post from database:', err);
      res
        .status(500)
        .send(
          '500 - Internal Server Error. Failed to fetch post from database'
        );
    } finally {
      if (connection) await connection.release();
    }
  },

  // Show form to add post
  showCreate: (req, res) => {
    res.send('this will be the form to create a post');
  },

  //  Add post
  create: async (req, res) => {
    // Get the request input
    let { title, body } = req.body;
    let userId = req.user.id;
    let connection;
    try {
      connection = await pool.getConnection();
      let result = await connection.execute(
        `INSERT INTO tattoo_eshop.posts (user_id, title, body) VALUES (?, ?, ?)`,
        [userId, title, body]
      );
      let postId = result.insertId;
      res.setHeader('Content-Type', 'application/json');
      res.send({ id: Number(postId), userId, title, body });
    } catch (err) {
      console.error('Failed to create new post:', err);
      res
        .status(500)
        .send('500 - Internal Server Error. Failed to create new post');
    } finally {
      if (connection) await connection.release();
    }
  },

  // Update post
  update: async (req, res) => {
    // Get the request input
    let { title, body } = req.body;
    let postId = req.params.postId;
    let connection;
    try {
      connection = await pool.getConnection();
      await connection.execute(
        `UPDATE tattoo_eshop.posts SET title=?, body=? WHERE id=?`,
        [title, body, postId]
      );
      let result = {
        id: Number(postId),
        title,
        body,
      };
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    } catch (err) {
      console.error('Failed to update post:', err);
      res
        .status(500)
        .send('500 - Internal Server Error. Failed to update post');
    } finally {
      if (connection) await connection.release();
    }
  },

  // Delete post
  delete: async (req, res) => {
    let connection;
    let postId = req.params.postId;
    try {
      connection = await pool.getConnection();
      let stmt = await connection.prepare(
        `DELETE FROM tattoo_eshop.posts WHERE id = ?`,
        [postId]
      );
      await stmt.execute(postId);
      res.send('Post deleted successfully');
    } catch (err) {
      console.error('Failed to delete post:', err);
      res
        .status(500)
        .send('500 - Internal Server Error. Failed to delete post');
    } finally {
      if (connection) await connection.release();
    }
  },
};

// Export the controllers
module.exports = postController;
