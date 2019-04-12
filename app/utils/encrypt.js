const crypto = require('crypto');
const Constants = require('./constants');

// FUNCTIONS
/**
 * Returns salt value
 * @returns {String} random salt value
 */
const generateSalt = () => {
  const set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
  let salt = '';
  for (let i = 0; i < 10; i += 1) {
    const p = Math.floor(Math.random() * set.length);
    salt += set[p];
  }
  return salt;
};

/**
 * Uses crypto to craete md5 of string
 * @param {String} str String wanting to be hashed
 * @returns {Promize} if crypto was successful
 */
const md5 = str =>
  crypto
    .createHash('md5')
    .update(str)
    .digest('hex');

/**
 * Creates salt and hash of password
 * @param {String} pass Password given
 * @returns {Promise} if it was successful creating salt
 */
const saltAndHash = pass =>
  new Promise((resolve, reject) => {
    const salt = generateSalt();
    if (!salt) {
      return reject(Error('Could not generate salt.'));
    }
    return resolve(salt + md5(pass + salt));
  });

/**
 * Validates if the hashed passwords match
 * @param {String} plainPass Password received by user
 * @param {String} hashedPass Hashed password to compare to
 * @returns {Promise} if passwords match
 */
const validatePassword = (plainPass, hashedPass) =>
  new Promise((resolve, reject) => {
    const salt = hashedPass.substr(0, 10);
    const validHash = salt + md5(plainPass + salt);
    if (hashedPass !== validHash) {
      return reject(Error(Constants.ERROR_LOGIN_INVALID));
    }
    return resolve(hashedPass === validHash);
  });

// EXPORTS
exports.generateSalt = generateSalt;
exports.md5 = md5;
exports.saltAndHash = saltAndHash;
exports.validatePassword = validatePassword;
