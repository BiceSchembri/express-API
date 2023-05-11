const jwt = require('jsonwebtoken');
const jwt_token = process.env.JWT_ACCESS_TOKEN;

const checkAuthentication = (req, res, next) => {
  //extract the access token from the request cookie
  const accessToken = req.cookies['tattoo_eshop.process'];

  if (!accessToken) {
    // If access token is not present, user is not authenticated
    // res.status(401).json({ message: 'Not authenticated' });

    // redirect user to login page if they are not authenticated
    console.log(
      'Not authenticated. User will be redirected to the login page.'
    );
    return res.status(401).redirect('/session/login');
  }
  try {
    // Verify the access token
    const decoded = jwt.verify(accessToken, jwt_token);
    req.user = decoded; // Attach the decoded user data to the request object
    next(); // proceed to the next middleware or route handler
  } catch (err) {
    // If access token verification fails, user is not authenticated
    return res
      .status(401)
      .json({ message: 'There was an error. You are not authenticated' });
  }
};

module.exports = checkAuthentication;
