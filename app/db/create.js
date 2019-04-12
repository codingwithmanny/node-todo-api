const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

/**
 * Main function for list
 * 
 * @returns {Void}
 */
const create = (collection, data) => {
    return db.get(collection)
        .push(data)
        .write();
};

module.exports = create;

