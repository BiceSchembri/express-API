const pageNotFound = (req, res, next) => {
  res.status(404).send(
    `404 - Page Not Found.
      <br>
      Sorry, the requested resource could not be found.`
  );
};

module.exports = pageNotFound;
