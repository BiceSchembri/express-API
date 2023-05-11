// Core modules
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
// const commentValidation = require('../middlewares/commentValidation.middleware');
// const commentNotFound = require('../middlewares/commentNotFound.middleware');

// Show all comments (no auth)
router
  .route('/posts/:postId/comments')
  .get(commentController.getAll)
  // Add comment
  // TODO: add auth / anonymous
  .post(commentController.create);

// Show, update, delete single comment
router
  .route('/posts/:postId/comments/:commentId')
  .get(commentController.getOne)
  // TODO: add auth
  .put(commentController.update)
  .delete(commentController.delete);

// Export the router
module.exports = router;
