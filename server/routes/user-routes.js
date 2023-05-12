// Core modules
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const checkAuthentication = require('../middlewares/checkAuthentication.middleware');
const isAdmin = require('../middlewares/isAdmin.middleware');

// Admin-specific routes
router.route('/users').get(checkAuthentication, isAdmin, userController.getAll);

// Export the router
module.exports = router;
