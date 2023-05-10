// Core modules
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const postValidation = require('../middlewares/postValidation.middleware');
const postNotFound = require('../middlewares/postNotFound.middleware');
const checkAuthentication = require('../middlewares/checkAuthentication.middleware');

// Show all posts (no auth)
router
  .route('/posts')
  .get(postController.getAll)
  // Create new post (user auth)
  .post(checkAuthentication, postValidation, postController.create);

// Show, update, delete single post (user auth)
router
  .route('/posts/:id')
  .get(checkAuthentication, postNotFound, postController.getOne)
  // TODO: add user auth (and admin auth optional)
  .put(checkAuthentication, postNotFound, postValidation, postController.update)
  .delete(checkAuthentication, postNotFound, postController.delete);

// Export the router
module.exports = router;
