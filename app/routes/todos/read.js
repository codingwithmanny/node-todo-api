const fs = require('fs');
const file = './db.json';
const Constants = require('../../utils/constants');

/**
 * read todo
 * @param {Object} req Request made by user
 * @param {Object} res Response sent back to user
 * @returns {Object} Main response send back to user
 */
const READ = (req, res) => {
    const { id } = req.params;

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
        const todos = json.todos.filter(el => el.id === id && el.userId === req.user.id);

        if (todos.length === 0) {
            return Promise.reject(Error(Constants.NOT_FOUND))
        }

        return todos[0];
    })
    .then(todo => res.send({ success: true, todo }))
    .catch(error =>
        res.status(400).send({
            success: false,
            error: (error.message && error.message) || error
        })
    );
};

module.exports = READ;