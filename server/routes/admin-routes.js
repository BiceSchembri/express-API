const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userNotFound = require('../middlewares/userNotFound.middleware');
const checkAuthentication = require('../middlewares/checkAuthentication.middleware');
const checkIfAdmin = require('../middlewares/checkIfAdmin.middleware');
const userValidation = require('../middlewares/userValidation.middleware');
const adminController = require('../controllers/adminController');

// ADMIN-SPECIFIC ROUTES

// An admin can see all admin's profiles
// NOTE: only an admin can create another admin's profile
router
  .route('/admins')
  .all(checkAuthentication, checkIfAdmin)
  .get(adminController.getAllAdmins)
  .post(userValidation, adminController.createAdmin);

// Show, edit, delete own (logged in) admin profile
// Same process as users, so it goes to the same controller
router
  .route('/admins/:userId')
  .all(userNotFound, checkAuthentication, checkIfAdmin)
  .get(userController.getOne)
  .put(userValidation, userController.update)
  .delete(userController.delete);

// Show all users
router
  .route('/users')
  .all(checkAuthentication, checkIfAdmin)
  .get(userController.getAllUsers);

// By clicking on one user, the admin would be redirected to the corresponding '/profile/:userId' page.
// They can access that thanks to middleware.
// See 'user-routes.js'

// Export the router
module.exports = router;
