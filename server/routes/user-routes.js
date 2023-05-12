// Core modules
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Admin-specific routes
// Admin only
router.route('/users').get(userController.getAll);

// Export the router
module.exports = router;
