const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

/**
 * Main function for list
 * 
 * @returns {Void}
 */
const list = (collection, key, value) => {
    if (key && value) {
        return db.get(collection)
            .find({ [key]: value })
            .value();
    }
    return db.get(collection)
        .value();
};

module.exports = list;

