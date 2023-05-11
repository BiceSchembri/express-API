const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// dotenv.config();
const jwt_token = process.env.JWT_ACCESS_TOKEN;

const checkAuthorization = (req, res, next) => {
  try {
    // Get user ID from JWT token
    const cookie = req.cookies['tattoo_eshop.process'];
    const decodedToken = jwt.verify(cookie, jwt_token);
    const userId = decodedToken.id;

    // Check if the user ID in the request parameters matches the ID in the JWT token
    if (userId != req.params.id) {
      return res.status(401).send('Not authorized to see this page');
    }
    next();
  } catch (err) {
    return res
      .status(401)
      .send('There was an error. You are not authorized to see this page');
  }
};

module.exports = checkAuthorization;
