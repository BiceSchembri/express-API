const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const checkAuthentication = require('../middlewares/checkAuthentication.middleware');
const checkIfAdmin = require('../middlewares/checkIfAdmin.middleware');
const userNotFound = require('../middlewares/userNotFound.middleware');

// Admin-specific routes
// Will show users
router
  .route('/users')
  .all(checkAuthentication, checkIfAdmin)
  .get(userController.getAll);

// Admins can see one user and delete them
router
  .route('/users/:userId')
  .all(userNotFound, checkAuthentication, checkIfAdmin)
  .get(userController.getOne)
  .delete(userController.delete);

// Export the router
module.exports = router;
