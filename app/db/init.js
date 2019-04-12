const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

/**
 * Main function for init
 * 
 * @returns {Void}
 */
const init = () => {
    // Set some defaults (required if your JSON file is empty)
    db.defaults({ todos: [], users: [] }).write();
};

module.exports = init;