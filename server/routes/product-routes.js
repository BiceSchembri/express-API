// Core modules
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const productValidation = require('../middlewares/productValidation.middleware');
const productNotFound = require('../middlewares/productNotFound.middleware');

// Show all products + Create new product
router
  .route('/products')
  .get(productController.getAll)
  // Admin only
  .post(productValidation, productController.create);

// Show, update, delete single product
router
  .route('/products/:id')
  .get(productNotFound, productController.getOne)
  // Admin only
  .put(productNotFound, productValidation, productController.update)
  .delete(productNotFound, productController.delete);

// Export the router
module.exports = router;
