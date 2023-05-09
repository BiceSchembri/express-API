const jwt = require('jsonwebtoken');
const jwt_token = process.env.JWT_ACCESS_TOKEN;

const checkAuthToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).send('Lacking credentials');

  jwt.verify(token, jwt_token, (err, user) => {
    if (err)
      return res
        .status(403)
        .send('You are not authorized to perform this request');
    req.user = user;
    next();
  });
};
module.exports = checkAuthToken;
