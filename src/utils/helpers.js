const fs = require('fs');
const fsPath = require('path');
const { DEFAULT_OPTIONS } = require('./constants');

const validateJSON = (json) => {
    try {
        JSON.parse(json);
        return true;
    } catch (e) {
        throw new Error(e);
    }
}

const validatePath = (path) => {
    if (!path || !path.length) {
        throw new Error('Path is required');
    } else {
        return path;
    }
}

const createPath = (path) => fsPath.join(process.cwd(), validatePath(path))

const getDB = (path) => {
    let db = {};
    let stats = fs.statSync(path);
    if (stats.size > 0) {
        let json;
        try {
            json = fs.readFileSync(path, 'utf8')
        } catch (e) {
            throw e;
        }
        if (validateJSON(json)) db = JSON.parse(json);
    }
    return db;
}

const setDefaultOptions = (options) => Object.assign({}, DEFAULT_OPTIONS, options);

const currentDate = () => new Date().toISOString();


module.exports = {
    validateJSON,
    validatePath,
    setDefaultOptions,
    createPath,
    getDB,
    currentDate
}