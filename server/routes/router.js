// GET request
const express = require('express'); //
const router = express.Router();

router.get('/', (req, res) => {
  res.send('GET request was sent successfully');
});

module.exports = router;
