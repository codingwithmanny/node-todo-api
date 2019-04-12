const Helpers = require('../utils/helpers');
const Constants = require('../utils/constants');

// FUNCTIONS
/**
 * Middleware which validate the JWT provided by the request in the header
 * @param {Object} req http request object from express
 * @param {Object} res http send object from express
 * @param {Function} next decides if the request should continue
 * @returns {Object} can return next or a send request with an error
 */
const jwt = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({
      success: false,
      message: Constants.ERROR_MIDDLEWARE_TOKEN
    });
  }

  return Helpers.ValidateJWT(token)
    .then(data => {
      const { uid, id } = data;

      req.user = {
        uid,
        id
      };
      return next();
    })
    .catch(error => res.status(401).send({ error }));
};

// EXPORTS
module.exports = jwt;
