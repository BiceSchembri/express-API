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

// Show, update, delete single post (user auth)
router
  .route('/posts/:id')
  .get(checkAuthToken, postNotFound, postController.getOne)
  // TODO: add user auth, admin auth
  .put(checkAuthToken, postNotFound, postValidation, postController.update)
  .delete(checkAuthToken, postNotFound, postController.delete);

// Export the router
module.exports = router;
