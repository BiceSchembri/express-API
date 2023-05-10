const jwt = require('jsonwebtoken');
const jwt_token = process.env.JWT_ACCESS_TOKEN;
const dotenv = require('dotenv');
dotenv.config();

const checkAuthToken = (req, res, next) => {
  //extract the access token from the request cookie
  const accessToken = req.cookies['tattoo_eshop.process'];

  if (!accessToken) {
    // If access token is not present, user is not authenticated
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify the access token
    const decoded = jwt.verify(accessToken, jwt_token);
    req.user = decoded; // Attach the decoded user data to the request object
    next(); // proceed to the next middleware or route handler
  } catch (err) {
    // If access token verification fails, user is not authenticated
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = checkAuthToken;
