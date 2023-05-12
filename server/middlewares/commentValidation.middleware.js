const commentValidation = (req, res, next) => {
  // Get the request input
  let { body } = req.body;
  // Check that required fields are not empty
  if (!body) {
    let err = new Error('Write something to post your comment!');
    console.log(err.message);
    res.status(400).send(err.message);
    return;
  }
  next();
};

module.exports = commentValidation;
