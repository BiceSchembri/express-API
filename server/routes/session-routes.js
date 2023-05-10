// Core modules
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userValidation = require('../middlewares/userValidation.middleware');
// const userNotFound = require('../middlewares/userNotFound.middleware');

// Register new user
router.route('/session/signup').post(userValidation, userController.create);

// Login user
router.route('/session/login').post(userController.login);

// Logout user
router.route('/session/logout').post(userController.logout);

// Export the router
module.exports = router;
