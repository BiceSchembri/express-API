const jwt = require('jsonwebtoken');
const jwt_token = process.env.JWT_ACCESS_TOKEN;

const checkAuthToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send('Lacking credentials');
  }
  try {
    jwt.verify(token, jwt_token, (err, user) => {
      if (err)
        return res
          .status(403)
          .send('You are not authorized to perform this request');
      req.user = user;
      next();
    });
  } catch (err) {
    res.status(401).send('this is not authorized');
  }
};
module.exports = checkAuthToken;
