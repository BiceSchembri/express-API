// Core modules
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userValidation = require('../middlewares/userValidation.middleware');
const userNotFound = require('../middlewares/userNotFound.middleware');
const checkAuthToken = require('../middlewares/checkAuthToken.middleware');

// Show all users
// will be admin only
router.route('/users').get(userController.getAll);

// Show, update, delete user profile
// needs user auth
router
  .route('/profile/:id')
  .get(userNotFound, checkAuthToken, userController.getOne)
  .put(userNotFound, checkAuthToken, userValidation, userController.update)
  .delete(userNotFound, checkAuthToken, userController.delete);

// Export the router
module.exports = router;
