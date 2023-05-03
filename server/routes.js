// Core modules
const express = require('express');
const router = express.Router();
const productController = require('./productController.js');
const validation = require('./validation.middleware.js');

// Show landing page
router.get('/', (req, res) => {
  res.send('This is the landing page of my tattoo e-shop. Welcome!');
});

router.get('/products', productController.getAll);
router.get('/products/:id', productController.getOne);
router.post('/products/create', validation, productController.create);
router.put('/products/:id', validation, productController.update);
router.delete('/products/:id', productController.delete);

// Export the router
module.exports = router;
