const Helpers = require('../../utils/helpers');
const Constants = require('../../utils/constants');
const fs = require('fs');
const file = './db.json';
const encrypt = require('../../utils/encrypt');

/**
 * Main function that handles login authentication
 * @param {Object} req Request made by user
 * @param {Object} res Response sent back to user
 * @returns {Object} Main response send back to user
 */
const LOGIN = (req, res) => {
  const { email, password } = req.body;

  // Validate Request
  if (!Helpers.ValidateEmail(email) || !password || password.length <= 0) {
    return res.status(401).send({
      message: Constants.ERROR_LOGIN_INPUTS
    });
  }

  return new Promise((resolve, reject) => {
      fs.readFile(file, (err, data) => {
          if (err) {
              return reject(new Error(err))
          }

          return resolve(data);
      })
  })
  .then((data) => {
      const json = JSON.parse(data);
      const users = [ ...[], ...json.users ];
      let user = users.filter(el => el.email === email)[0] || null;

      if (!user) {
          return Promise.reject(Error(Constants.ERROR_LOGIN_NOTFOUND));
      }

      return encrypt.validatePassword(password, user.password);
  })
  .then(() => {
    const now = new Date().getTime();
    const expires = now + 60 * 60; // Maximum expiration time is one hour
    
    return Helpers.GenerateJWT({
      uid: email,
      iat: now,
      exp: expires
    });
  })
  .then(token => {
      res.send({ success: true, token })
  })
  .catch(error =>
      res.status(400).send({
          success: false,
          error: (error.message && error.message) || error
      })
  );
};

module.exports = LOGIN;
