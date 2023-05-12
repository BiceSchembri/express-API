// Core modules
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const productValidation = require('../middlewares/productValidation.middleware');
const productNotFound = require('../middlewares/productNotFound.middleware');
const checkAuthentication = require('../middlewares/checkAuthentication.middleware');
const checkIfAdmin = require('../middlewares/checkIfAdmin.middleware');

// Show all products + Create new product
router
  .route('/products')
  .get(productController.getAll)
  // Admin only
  .post(
    checkAuthentication,
    checkIfAdmin,
    productValidation,
    productController.create
  );

// Show, update, delete single product
router
  .route('/products/:productId')
  .all(productNotFound)
  .get(productController.getOne)
  // Admin only
  .put(
    checkAuthentication,
    checkIfAdmin,
    productValidation,
    productController.update
  )
  .delete(checkAuthentication, checkIfAdmin, productController.delete);

// Export the router
module.exports = router;
