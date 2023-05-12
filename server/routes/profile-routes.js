const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userValidation = require('../middlewares/userValidation.middleware');
const userNotFound = require('../middlewares/userNotFound.middleware');
const checkAuthentication = require('../middlewares/checkAuthentication.middleware');
const profileAuthorization = require('../middlewares/profileAuthorization.middleware');

// Show, update, delete user profile (user auth)
router
  .route('/profile/:userId')
  .all(userNotFound, checkAuthentication, profileAuthorization)
  .get(userController.getOne)
  .put(userValidation, userController.update)
  .delete(userController.delete);

router
  .route('/profile/:userId/myposts')
  .all(userNotFound, checkAuthentication, profileAuthorization)
  .get(userController.getUserPosts);

// Export the router
module.exports = router;
