const jwt = require('jsonwebtoken');
const jwt_token = process.env.JWT_ACCESS_TOKEN;

const checkAuthorization = (req, res, next) => {
  try {
    // Get user ID from JWT token
    const cookie = req.cookies['tattoo_eshop.process'];
    const decodedToken = jwt.verify(cookie, jwt_token);
    const userId = decodedToken.id;

    console.log(`req.user.id / user id = ${req.user.id}`); // id of the logged in user
    console.log(`req.params.id / post id = ${req.params.id}`); // id of the post
    console.log(`userId / from token = ${userId}`); // id of the logged in user - cookie token
    console.log(`decodedToken = ${JSON.stringify(decodedToken)}`);

    // Check if the user ID in the request parameters matches the ID in the JWT token
    if (userId != req.user.id) {
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
