const fs = require('fs');
const file = './db.json';
const uuid = require('uuid/v1');

/**
 * Create todo
 * @param {Object} req Request made by user
 * @param {Object} res Response sent back to user
 * @returns {Object} Main response send back to user
 */
const CREATE = (req, res) => {
    const { text, done } = req.body;
    const { user } = req;
    const id = uuid();

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
        json.todos.push({
            id,
            userId: user.id,
            text,
            done
        });

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
    .then(() => 
        res.send({
            success: true,
                todo: {
                id,
                userId: user.id,
                text,
                done
            }
        })
    )
    .catch(error =>
        res.status(400).send({
            success: false,
            error: (error.message && error.message) || error
        })
    );
};

module.exports = CREATE;
