// Core modules
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const postValidation = require('../middlewares/postValidation.middleware');
const postNotFound = require('../middlewares/postNotFound.middleware');
const checkAuthToken = require('../middlewares/checkAuthToken.middleware');

// Show all posts (no auth)
router
  .route('/posts')
  .get(postController.getAll)
  // Create new post (user auth)
  .post(checkAuthToken, postValidation, postController.create);

// Show, update, delete single post
router
  .route('/posts/:id')
  .get(postNotFound, postController.getOne)
  // TODO: add user auth, admin auth
  .put(postNotFound, postValidation, postController.update)
  .delete(postNotFound, postController.delete);

// Export the router
module.exports = router;
