const Constants = require('../../utils/constants');
const fs = require('fs');
const file = './db.json';

/**
 * Deletes todo
 * @param {Object} req Request made by user
 * @param {Object} res Response sent back to user
 * @returns {Object} Main response send back to user
 */
const DELETE = (req, res) => {
    const { id } = req.params;
    let index = null;

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
        const todos = json.todos.filter((el, key) => {
            if (el.id === id && el.userId === req.user.id) {
                index = key;
            }
            return el.id === id && el.userId === req.user.id;
        });

        if (todos.length === 0) {
            return Promise.reject(Error(Constants.NOT_FOUND))
        }

        const newTodos = [ ...json.todos.slice(0, index), ...json.todos.slice(index + 1) ];
        json.todos = newTodos;

        return json;
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
    .then(() => res.send({ success: true }))
    .catch(error =>
        res.status(400).send({
            success: false,
            error: (error.message && error.message) || error
        })
    );
};

module.exports = DELETE;