const fs = require('fs');
const file = './db.json';

/**
 * list todos
 * @param {Object} req Request made by user
 * @param {Object} res Response sent back to user
 * @returns {Object} Main response send back to user
 */
const LIST = (req, res) => {
    const { id } = req.user;

    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) {
                return reject(new Error(err))
            }
  
            return resolve(data);
        })
    })
    .then(data => JSON.parse(data))
    .then(json => {
        return res.send({
            success: true,
            todos: json.todos.filter(el => el.userId === id)
        });
    })
    .catch(error =>
        res.status(400).send({
            success: false,
            error: (error.message && error.message) || error
        })
    );
};

module.exports = LIST;