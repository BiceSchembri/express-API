// Core modules
const express = require('express'); //
const router = express.Router();
const controllers = require('./controllers.js');

// Show landing page
router.get('/', (req, res) => {
  res.send('This is the landing page of my tattoo e-shop. Welcome!');

  //in a real-world app, this would be sending back a file, for example:
  // res.send()
});

router.get('/products', controllers.getProducts);
// router.post('/', controllers.postProduct);
// router.put('/:id', controllers.updateProduct);
// router.delete('/:id', controllers.deleteProduct);

// Export the router
module.exports = router;
