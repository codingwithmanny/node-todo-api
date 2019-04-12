const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

/**
 * Main function for list
 * 
 * @returns {Void}
 */
const read = (collection, key, value) => {
    return db.get(collection)
        .find({ [key]: value })
        .value();
};

module.exports = read;

