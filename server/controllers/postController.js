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
      console.log(`Retrieved ${result.length} rows from the database`);
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

  // Show post
  getOne: async (req, res) => {
    let connection;
    let id = req.params.id;
    try {
      connection = await pool.getConnection();
      let result = await connection.query(
        `SELECT * FROM tattoo_eshop.posts WHERE id=?`,
        [id]
      );
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

  // Delete post
  delete: async (req, res) => {
    let connection;
    let id = req.params.id;
    try {
      connection = await pool.getConnection();
      let stmt = await connection.prepare(
        `DELETE FROM tattoo_eshop.posts WHERE id = ?`,
        [id]
      );
      await stmt.execute(id);
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

  //  Add post
  create: async (req, res) => {
    // Get the request input
    let { user_id, title, body } = req.body;
    let connection;
    try {
      connection = await pool.getConnection();
      let result = await connection.execute(
        `INSERT INTO tattoo_eshop.posts (user_id, title, body) VALUES (?, ?, ?)`,
        [user_id, title, body]
      );
      let id = result.insertId;
      res.setHeader('Content-Type', 'application/json');
      res.send({ id: Number(id), user_id, title, body });
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
    let id = req.params.id;
    let connection;
    try {
      connection = await pool.getConnection();
      await connection.execute(
        `UPDATE tattoo_eshop.posts SET title=?, body=? WHERE id=?`,
        [title, body, id]
      );
      let result = {
        id: Number(id),
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
};

// Export the controllers
module.exports = postController;
