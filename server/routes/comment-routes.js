// Core modules
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const commentValidation = require('../middlewares/commentValidation.middleware');
const commentNotFound = require('../middlewares/commentNotFound.middleware');

// Show all comments (no auth)
router
  .route('/comments')
  .get(commentController.getAll)
  // Add comment (add anonymous)
  .post(commentValidation, commentController.create);

// Show, update, delete single comment
router
  .route('/comment/:id')
  .get(commentNotFound, commentController.getOne)
  // TODO: add auth (user can edit/delete own; anonymous cannot edit or delete)
  .put(commentNotFound, commentValidation, commentController.update)
  .delete(commentNotFound, commentController.delete);

// Export the router
module.exports = router;
