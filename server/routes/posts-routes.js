// Core modules
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const postValidation = require('../middlewares/postValidation');

// Show all posts (no auth)
router
  .route('/posts')
  .get(postController.getAll)
  // create post (user auth)
  .post(postValidation, postController.create);

// Show, update, delete single post
// add user auth
router
  .route('/products/:id')
  .get(postNotFound, postController.getOne)
  .put(postNotFound, postValidation, postController.update)
  .delete(postNotFound, postController.delete);

// Export the router
module.exports = router;
