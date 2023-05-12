// Core modules
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const commentValidation = require('../middlewares/commentValidation.middleware');
const commentNotFound = require('../middlewares/commentNotFound.middleware');
const checkAuthentication = require('../middlewares/checkAuthentication.middleware');
const checkAuthorization = require('../middlewares/checkAuthorization.middleware');
const commentAuthorization = require('../middlewares/commentAuthorization.middleware');

// NOTE: there is no "show all comments", as comments are shown directly under the post to which they belong.

// Create new comment
router
  .route('/posts/:postId/new-comment')
  // User needs to be authenticated
  .post(checkAuthentication, commentValidation, commentController.create);

// Show, update, delete single comment
router
  .route('/posts/:postId/:commentId')
  .all(commentNotFound)
  .get(commentController.getOne)
  // User needs to be authenticated and authorized
  .put(
    checkAuthentication,
    checkAuthorization,
    commentAuthorization,
    commentValidation,
    commentController.update
  )
  .delete(
    checkAuthentication,
    checkAuthorization,
    commentAuthorization,
    commentController.delete
  );

// Export the router
module.exports = router;
