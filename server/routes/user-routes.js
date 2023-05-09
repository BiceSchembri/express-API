// Core modules
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userFormValidation = require('../middlewares/userFormValidation.middleware');
const userNotFound = require('../middlewares/userNotFound.middleware');
const cookieJwtAuth = require('../middlewares/cookieJwtAuth.middleware');

// Show all users
router.route('/users').get(userController.getAll);

// Register new user
router.route('/session/signup').post(userFormValidation, userController.create);

// Login user
router.route('/session/login').post(userController.login);

// Auth route
router.route('session/add').post(cookieJwtAuth, userController.addRoute);

// Logout user
// router
// .route('/session/logout')
// .delete('/logout', userController.logout)

// Show, update, delete single user
router
  .route('/users/:id')
  .get(userNotFound, userController.getOne)
  .put(userNotFound, userFormValidation, userController.update)
  .delete(userNotFound, userController.delete);

// Export the router
module.exports = router;
