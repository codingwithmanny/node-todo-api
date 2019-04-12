const Constants = require('../../utils/constants');
const fs = require('fs');
const file = './db.json';

/**
 * Update todo
 * @param {Object} req Request made by user
 * @param {Object} res Response sent back to user
 * @returns {Object} Main response send back to user
 */
const UPDATE = (req, res) => {
    const { id } = req.params;
    const { text, done}  = req.body;
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
        index = null;
        const todos = json.todos.filter((el, key) => {
            if (el.id === id && el.userId === req.user.id) {
                index = key;
            }
            return el.id === id && el.userId === req.user.id;
        });

        if (todos.length === 0) {
            return Promise.reject(Error(Constants.NOT_FOUND))
        }

        json.todos[index].text = text || '';
        json.todos[index].done = done || json.todos[index].done;

        return json;
    })
    .then(updatedJson => {
        return new Promise((resolve, reject) => {
            fs.writeFile(file, JSON.stringify(updatedJson), 'utf8', (error) => {
                if (error) {
                    return reject(new Error(err))
                }
                return resolve(updatedJson)
            });
        })
    })
    .then(updatedJson => 
        res.send({
            success: true,
            todo: updatedJson.todos[index]
        })
    )
    .catch(error =>
        res.status(400).send({
            success: false,
            error: (error.message && error.message) || error
        })
    );
};

module.exports = UPDATE;