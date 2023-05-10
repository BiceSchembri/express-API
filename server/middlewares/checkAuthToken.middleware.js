const jwt = require('jsonwebtoken');
const jwt_token = process.env.JWT_ACCESS_TOKEN;

// const checkAuthToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(401).send('Lacking credentials');
//   }
//   try {
//     jwt.verify(token, jwt_token, (err, user) => {
//       if (err)
//         return res
//           .status(403)
//           .send('You are not authorized to perform this request');
//       req.user = user;
//       next();
//     });
//   } catch (err) {
//     res.status(401).send('this is not authorized');
//   }
// };

const cookieParser = require('cookie-parser');

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
