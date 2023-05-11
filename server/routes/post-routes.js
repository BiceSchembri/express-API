// Core modules
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const postValidation = require('../middlewares/postValidation.middleware');
const postNotFound = require('../middlewares/postNotFound.middleware');
const checkAuthentication = require('../middlewares/checkAuthentication.middleware');
const checkAuthorization = require('../middlewares/checkAuthorization.middleware');
const postAuth = require('../middlewares/postAuth');

// Show all posts (no auth)
router.route('/posts').get(postController.getAll);
// Create new post (user auth)

router
  .route('/posts/new-post')
  .get(postController.showCreate)
  .post(checkAuthentication, postValidation, postController.create);

// Show, update, delete single post
router
  .route('/posts/:id')
  .all(postNotFound)
  .get(postController.getOne)
  // TODO: add user auth (and admin auth optional)
  .put(
    checkAuthentication,
    checkAuthorization,
    postAuth,
    postValidation,
    postController.update
  )
  .delete(
    checkAuthentication,
    checkAuthorization,
    postAuth,
    postController.delete
  );

// Export the router
module.exports = router;
