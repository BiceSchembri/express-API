const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const postValidation = require('../middlewares/postValidation.middleware');
const postNotFound = require('../middlewares/postNotFound.middleware');
const checkAuthentication = require('../middlewares/checkAuthentication.middleware');
const postAuthorization = require('../middlewares/postAuthorization.middleware');

// Show all posts
router.route('/posts').get(postController.getAll);
router
  .route('/posts/new-post')
  .get(postController.showCreate)
  // User needs to be authenticated
  .post(checkAuthentication, postValidation, postController.create);

// Show, update, delete single post
router
  .route('/posts/:postId')
  .all(postNotFound)
  .get(postController.getOne)
  // User needs to be authenticated and authorized to edit/delete
  // or else have admin priileges
  .put(
    checkAuthentication,
    postAuthorization,
    postValidation,
    postController.update
  )
  .delete(checkAuthentication, postAuthorization, postController.delete);

// Export the router
module.exports = router;
