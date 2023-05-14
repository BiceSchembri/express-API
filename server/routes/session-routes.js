// Core modules
const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const userValidation = require('../middlewares/userValidation.middleware');

// Register new user
router
  .route('/session/signup')
  .post(userValidation, sessionController.createUser);

// Login user
router
  .route('/session/login')
  .get(sessionController.showLogin)
  .post(sessionController.login);

// Logout user
router.route('/session/logout').post(sessionController.logout);

// Export the router
module.exports = router;
