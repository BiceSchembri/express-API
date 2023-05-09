const postValidation = (req, res, next) => {
  // Get the request input
  let { title, body } = req.body;
  // Check that required fields are not empty
  if (!title || !body) {
    let err = new Error('Title and body cannot be empty');
    console.log(err.message);
    res.status(400).send(err.message);
    return;
  }
  next();
};

module.exports = postValidation;
