const jwt = require('jsonwebtoken');
const jwt_token = process.env.JWT_ACCESS_TOKEN;

// This middleware gets the token out o the cookie and verifies it

const cookieJwtAuth = (req, res, next) => {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, jwt_token);
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie('token');
    return res.redirect('/');
  }
};

module.exports = cookieJwtAuth;
