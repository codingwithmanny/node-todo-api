const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

/**
 * Main function for list
 * 
 * @returns {Void}
 */
const del = (collection, key, value) => {
    const all = db.get(collection);

    return all.map((el, key) => {
        if (el[key] === value) {
            all.unset(key).write();
            return;
        }
        return el;
    });
};

module.exports = del;

