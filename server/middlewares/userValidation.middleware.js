const userValidation = (req, res, next) => {
  // Get the request input
  let { firstname, lastname, username, email, password } = req.body;
  // Check that required fields are not empty
  if (!firstname || !lastname || !username || !email || !password) {
    let err = new Error(
      'First name, last name, username, email and password cannot be empty'
    );
    console.log(err.message);
    res.status(400).send(err.message);
    return;
  }
  next();
};

module.exports = userValidation;
