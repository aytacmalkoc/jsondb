const Database = require('./utils/database');
const { setDefaultOptions, createPath, timeSince, getFileSize } = require('./utils/helpers');

/**
 * @param {string} path
 * @param {Object} [options]
 * @param {boolean} options.uuid
 * @param {string} options.primaryKey
 * @param {boolean} options.minify
 * @param {boolean} options.timestamp
 * @constructor
 */
function JsonDB(path, options) {
  this.path = createPath(path);
  this.options = setDefaultOptions(options);
  this.db = new Database(this.path, this.options);
}

/**
 * @param {string} date
 * @returns {string}
 */
JsonDB.prototype.timeAgo = function (date) {
  return timeSince(date);
};

/**
 * @param {string} key
 * @param {Object} value
 * @returns {Object}
 */
JsonDB.prototype.add = function (key, value) {
  return this.db.add(key, value);
};

/**
 * @param {string} modelName
 * @param {string} key
 * @param {string} operator
 * @param {string|number|boolean|number[]} value
 * @returns {*[]|null}
 */
JsonDB.prototype.where = function (modelName, key, operator, value) {
  return this.db.where(modelName, key, operator, value);
};

/**
 * @param {string} key
 * @param {number|string} id
 * @returns {Object}
 */
JsonDB.prototype.findById = function (key, id) {
  return this.db.findById(key, id);
};

/**
 * @param {string} key
 * @returns {Array}
 */
JsonDB.prototype.findAll = function (key) {
  return this.db.findAll(key);
};

/**
 * @param {string} key
 * @param {number|string} id
 * @param {Object} value
 * @returns {Object}
 */
JsonDB.prototype.update = function (key, id, value) {
  return this.db.update(key, id, value);
};

/**
 * @param {string} key
 * @param {number|string} id
 * @returns {boolean}
 */
JsonDB.prototype.delete = function (key, id) {
  return this.db.delete(key, id);
};

/**
 * @param {string} key
 * @returns {boolean}
 */
JsonDB.prototype.deleteAll = function (key) {
  return this.db.deleteAll(key);
};

/**
 * @returns {boolean}
 */
JsonDB.prototype.clear = function () {
  return this.db.clear();
};

/**
 * @param {number} toFixed
 * @returns {{mb: number, byte: number, kb: number, gb: number}}
 */
JsonDB.prototype.getDatabaseSize = function (toFixed = 2) {
  return getFileSize(this.path, toFixed);
}

module.exports = JsonDB;
