// Core modules
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const validation = require('../middlewares/validation.middleware');
const notFound = require('../middlewares/notFound.middleware');

// Show landing page
router.get('/', (req, res) => {
  res.send(
    `Welcome!
    <br>
    This is the landing page of my tattoo e-shop.`
  );
});

router.get('/products', productController.getAll);
router.get('/products/:id', productController.getOne);
router.post('/products/create', validation, productController.create);
router.put('/products/:id', validation, productController.update);
router.delete('/products/:id', productController.delete);

// Add a 404 middleware
router.use((req, res, next) => {
  res.status(404).send(
    `404 - Page Not Found.
      <br>
      Sorry, the requested resource could not be found.`
  );
});

// Export the router
module.exports = router;
