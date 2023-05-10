// Core modules
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Show all users
// will be admin only
router.route('/users').get(userController.getAll);

// Export the router
module.exports = router;
