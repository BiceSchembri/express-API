// Core modules
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const userController = require('../controllers/userController');
const tattooFormValidation = require('../middlewares/tattooFormValidation.middleware');
const userFormValidation = require('../middlewares/userFormValidation.middleware');
const recordNotFound = require('../middlewares/recordNotFound.middleware');
const userNotFound = require('../middlewares/userNotFound.middleware');

// Show landing page
router.route('/').get((req, res) => {
  res.send(
    `Welcome!
    <br>
    This is the landing page of my tattoo e-shop.`
  );
});

// PRODUCTS

// Show all products + Create new product
router
  .route('/products')
  .get(productController.getAll)
  .post(tattooFormValidation, productController.create);

// Show, update, delete single product
router
  .route('/products/:id')
  .get(recordNotFound, productController.getOne)
  .put(recordNotFound, tattooFormValidation, productController.update)
  .delete(recordNotFound, productController.delete);

// END OF PRODUCTS

// USERS

// Show all users + Create new product
router
  .route('/users')
  .get(userController.getAll)
  .post(userFormValidation, userController.create);

// Show, update, delete single user
router
  .route('/users/:id')
  .get(userNotFound, userController.getOne)
  .put(userNotFound, userFormValidation, userController.update)
  .delete(userNotFound, userController.delete);

// END OF USERS

// Export the router
module.exports = router;

// Create new product
// router
//   .route('/create')
//   .get(productController.createPage)
