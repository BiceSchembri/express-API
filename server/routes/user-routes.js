// Core modules
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userFormValidation = require('../middlewares/userFormValidation.middleware');
const userNotFound = require('../middlewares/userNotFound.middleware');
const authenticateToken = require('../middlewares/authenticateToken.middleware');

// Show all users
router.route('/users').get(userController.getAll);

// Show, update, delete single user
router
  .route('/users/:id')
  .get(userNotFound, authenticateToken, userController.getOne)
  .put(
    userNotFound,
    authenticateToken,
    userFormValidation,
    userController.update
  )
  .delete(userNotFound, authenticateToken, userController.delete);

// Export the router
module.exports = router;
