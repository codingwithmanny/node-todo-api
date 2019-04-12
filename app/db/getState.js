const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

/**
 * Main function for getting state
 * 
 * @returns {Void}
 */
const getState = () => db.getState();

module.exports = getState;

