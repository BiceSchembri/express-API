// Core modules
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userFormValidation = require('../middlewares/userFormValidation.middleware');
const userNotFound = require('../middlewares/userNotFound.middleware');
const cookieJwtAuth = require('../middlewares/cookieJwtAuth.middleware');

// Show all users
router.route('/users').get(userController.getAll);

// Show, update, delete single user
router
  .route('/users/:id')
  .get(userNotFound, userController.getOne)
  .put(userNotFound, userFormValidation, userController.update)
  .delete(userNotFound, userController.delete);

// Export the router
module.exports = router;