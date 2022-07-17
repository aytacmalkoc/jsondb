const { createDatabase, updateDatabase } = require("./file");
const { getDB, currentDate } = require("./helpers");
const { v4: uuidv4 } = require('uuid');

function Database(path, options) {
    createDatabase(path);
    this.path = path;
    this.options = options;
    this.db = getDB(path);
}

Database.prototype.read = function () {
    return this.db;
}

Database.prototype.add = function (modelName, value) {
    let model = this.createModel(modelName);
    const json = {
        [this.options.primaryKey]: this.options.uuid ? uuidv4() : model.length + 1,
        ...value,
    }

    if (this.options.timestamp) {
        json.created_at = currentDate();
        json.updated_at = currentDate();
    }

    model.push(json);

    this.save();

    return json
}

Database.prototype.findById = function (modelName, id) {
    let model = this.db.data[modelName];

    if (!model) return null;

    return model.find(item => item[this.options.primaryKey] === id);
}

Database.prototype.findAll = function (modelName) {
    return this.db.data[modelName];
}

Database.prototype.update = function (modelName, id, value) {
    let model = this.db.data[modelName];

    if (!model) return null;

    const index = model.findIndex(item => item[this.options.primaryKey] === id);

    if (index === -1) return null;

    model[index] = {
        ...model[index],
        ...value,
        updated_at: currentDate(),
    }

    this.db.data[modelName] = model;

    this.save();

    return model[index];
}

Database.prototype.delete = function (modelName, id) {
    let model = this.db.data[modelName];

    if (!model) return null;

    model = model.filter(item => item[this.options.primaryKey] !== id);

    this.db.data[modelName] = model;

    this.save();

    return true;
}

Database.prototype.deleteAll = function (modelName) {
    this.db.data[modelName] = [];

    this.save();

    return true;
}

Database.prototype.clear = function () {
    this.db.data = {};

    this.save();

    return true;
}

Database.prototype.createModel = function (modelName, initialValue = []) {

    if (!this.db.data[modelName]) {
        this.db.data[modelName] = initialValue;
    }

    this.save();

    return this.db.data[modelName];
}

Database.prototype.save = function () {
    updateDatabase(this.path, this.db);
}

module.exports = Database