// Core modules
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userValidation = require('../middlewares/userValidation.middleware');
const userNotFound = require('../middlewares/userNotFound.middleware');
const checkAuthentication = require('../middlewares/checkAuthentication.middleware');
const checkAuthorization = require('../middlewares/checkAuthorization.middleware');

// Show, update, delete user profile (user auth)
router
  .route('/profile/:id')
  .all(userNotFound, checkAuthentication, checkAuthorization)
  .get(userController.getOne)
  .put(userValidation, userController.update)
  .delete(userController.delete);

// Export the router
module.exports = router;
