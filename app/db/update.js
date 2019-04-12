const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

/**
 * Main function for list
 * 
 * @returns {Void}
 */
const update = (collection, findKey, findValue, data) => {
    return db.update(collection).find({ [findKey]: findValue }).assign(data).write();
};

module.exports = update;

