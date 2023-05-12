// Core modules
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const checkAuthentication = require('../middlewares/checkAuthentication.middleware');
const checkIfAdmin = require('../middlewares/checkIfAdmin.middleware');

// Admin-specific routes
router
  .route('/users')
  .get(checkAuthentication, checkIfAdmin, userController.getAll);

// Export the router
module.exports = router;
