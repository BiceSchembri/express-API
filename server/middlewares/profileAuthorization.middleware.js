const jwt = require('jsonwebtoken');
const jwt_token = process.env.JWT_ACCESS_TOKEN;

const profileAuthorization = async (req, res, next) => {
  try {
    // Get user ID from JWT token
    const cookie = req.cookies['tattoo_eshop.process'];
    const decodedToken = jwt.verify(cookie, jwt_token);
    const isAdmin = decodedToken.isAdmin;

    // check if the userId in the cookie token is the same as the profile id that the user is trying to access
    // also check if admin (admins are authorized to see users' profiles)
    if (req.params.userId != req.user.id && isAdmin !== 1) {
      return res.status(401).send('Not authorized to see this page');
    }
    next();
  } catch (err) {
    return res
      .status(401)
      .send('There was an error. You are not authorized to see this page');
  }
};

module.exports = profileAuthorization;
