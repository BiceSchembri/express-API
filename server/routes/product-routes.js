// Core modules
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const tattooFormValidation = require('../middlewares/tattooFormValidation.middleware');
const recordNotFound = require('../middlewares/recordNotFound.middleware');

// Show landing page
router.route('/').get((req, res) => {
  res.send(
    `Welcome!
    <br>
    This is the landing page of my tattoo e-shop.`
  );
});

// Show all products + Create new product
router
  .route('/products')
  .get(productController.getAll)
  .post(tattooFormValidation, productController.create);

// Show, update, delete single product
// add admin auth
router
  .route('/products/:id')
  .get(recordNotFound, productController.getOne)
  .put(recordNotFound, tattooFormValidation, productController.update)
  .delete(recordNotFound, productController.delete);

// Export the router
module.exports = router;
