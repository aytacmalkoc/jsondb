const Database = require('./utils/database');
const { setDefaultOptions, createPath } = require('./utils/helpers');

function JsonDB(path, options) {
    this.path = createPath(path);
    this.options = setDefaultOptions(options);
    this.db = new Database(this.path, this.options);
}

JsonDB.prototype.add = function (key, value) {
    this.db.add(key, value);
}

JsonDB.prototype.findById = function (key, id) {
    return this.db.findById(key, id);
}

JsonDB.prototype.findAll = function (key) {
    return this.db.findAll(key);
}

JsonDB.prototype.update = function (key, id, value) {
    return this.db.update(key, id, value);
}

JsonDB.prototype.delete = function (key, id) {
    this.db.delete(key, id);
}

JsonDB.prototype.deleteAll = function (key) {
    this.db.deleteAll(key);
}

JsonDB.prototype.clear = function () {
    this.db.clear();
}

module.exports = JsonDB;