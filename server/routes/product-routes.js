// Core modules
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const productValidation = require('../middlewares/productValidation.middleware');
const productNotFound = require('../middlewares/productNotFound.middleware');
const checkAuthentication = require('../middlewares/checkAuthentication.middleware');
const isAdmin = require('../middlewares/isAdmin.middleware');

// Show all products + Create new product
router
  .route('/products')
  .get(productController.getAll)
  // Admin only
  .post(
    checkAuthentication,
    isAdmin,
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
    isAdmin,
    productValidation,
    productController.update
  )
  .delete(checkAuthentication, isAdmin, productController.delete);

// Export the router
module.exports = router;
