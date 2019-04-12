const jwt = require('jsonwebtoken');

// FUNCTIONS
/**
 * Validates if a string is a valid email address
 * @param {String} email String to validate as an email
 * @returns {Boolean} Wether or not the string passes the email regex
 */
const ValidateEmail = email =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

/**
 * Generates main JWT
 * @param {Object} options Set of options to append to defaults
 * @returns {Promise} error is an object, success is a string
 */
const GenerateJWT = (options = {}) => {
  const defaultOptions = Object.assign(
    {
      iss: 'ISSUER',
      sub: 'SUB',
      aud: 'http://localhost:5000'
    },
    options
  );

  defaultOptions.claims = defaultOptions.claims ? defaultOptions.claims : {};

  return new Promise((resolve, reject) => {
    jwt.sign(defaultOptions, 'SECRET-KEY', { algorithm: 'HS256' }, (error, token) => {
      if (error) {
        return reject(error);
      }
      return resolve(token);
    });
  });
};

/**
 * Validates token
 * @param {String} token JWT String
 * @returns {Promise} returns error or decoded JWT
 */
const ValidateJWT = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, 'SECRET-KEY', { algorithm: 'HS256' }, (error, decoded) => {
      if (error) {
        return reject(error);
      }
      return resolve(decoded);
    });
  });

// EXPORTS
exports.GenerateJWT = GenerateJWT;
exports.ValidateJWT = ValidateJWT;
exports.ValidateEmail = ValidateEmail;
