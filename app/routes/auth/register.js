const Helpers = require('../../utils/helpers');
const Constants = require('../../utils/constants');
const encrypt = require('../../utils/encrypt');
const uuid = require('uuid/v1');
const fs = require('fs');
const file = './db.json';

/**
 * Main function that handles login authentication
 * @param {Object} req Request made by user
 * @param {Object} res Response sent back to user
 * @returns {Object} Main response send back to user
 */
const REGISTER = (req, res) => {
    const { email, password } = req.body;

    // Validate Fields
    if (!Helpers.ValidateEmail(email) || !password || password.length <= 0) {
        return res.status(401).send({
            message: Constants.ERROR_LOGIN_INPUTS
        });
    }

    const id = uuid();

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
        
        if (users.filter(el => el.email === email).length > 0) {
            return Promise.reject(Error(Constants.ERROR_REGISTER_DUPLICATE));
        }

        return encrypt.saltAndHash(password)
            .then(hash => {
                json.users.push({
                    id,
                    email,
                    password: hash
                });
        
                return json;
            });
    })
    .then(updatedJson => {
        return new Promise((resolve, reject) => {
            fs.writeFile(file, JSON.stringify(updatedJson), 'utf8', (error) => {
                if (error) {
                    return reject(new Error(err))
                }
                return resolve(true)
            });
        })
    })
    .then(() => {
        const now = new Date().getTime();
        const expires = now + 60 * 60; // Maximum expiration time is one hour
        return Helpers.GenerateJWT({
            id,
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

module.exports = REGISTER;
