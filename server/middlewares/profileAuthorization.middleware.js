const profileAuthorization = async (req, res, next) => {
  try {
    // check if the userId in the cookie token is the same as the profile id that the user is trying to access
    if (req.params.userId != req.user.id) {
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
