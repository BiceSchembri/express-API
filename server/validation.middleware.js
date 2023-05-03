const validation = (req, res, next) => {
  // Get the request input
  let { title, description, image, price_in_EUR } = req.body;
  // Check that required fields are not empty
  if (!title || !description || !price_in_EUR) {
    let err = new Error('Title, description and price cannot be empty');
    res.status(400).send(err.message);
    return;
  }
  next();
};

module.exports = validation;
