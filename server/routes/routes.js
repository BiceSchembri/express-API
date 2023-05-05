// Core modules
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const tattooFormValidation = require('../middlewares/tattooFormValidation.middleware');
const pageNotFound = require('../middlewares/pageNotFound.middleware');

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
router
  .route('/products/:id')
  .get(productController.getOne)
  .put(tattooFormValidation, productController.update)
  .delete(productController.delete);

// Mount a 404 middleware for all non-existing routes (this goes at the bottom of the stack)
router.use(pageNotFound);

// Export the router
module.exports = router;

// Create new product
// router
//   .route('/create')
//   .get(productController.createPage)
