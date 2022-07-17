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

const createPath = (path) => {
    return fsPath.join(process.cwd(), validatePath(path))
}

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

const writeDB = (path, db) => {
    fs.writeFileSync(path, JSON.stringify({ data: db }));
}

const fileExistence = (path) => {
    try {
        return fs.statSync(path);
    } catch (e) {
        if (e.code === 'ENOENT') {
            /* File doesn't exist */
            createFile(path);
            return;
        } else if (e.code === 'EACCES') {
            throw new Error(`Cannot access path "${path}".`);
        } else {
            // Other error
            throw new Error(`Error while checking for existence of path "${path}": ${e}`);
        }
    }
}

const createFile = (path) => {
    try {
        fs.writeFileSync(path, JSON.stringify(DEFAULT_OPTIONS));
    } catch (e) {
        throw new Error(`Error while creating file "${path}": ${e}`);
    }
}

const fileExists = (path) => {
    try {
        fs.accessSync(path, fs.constants.R_OK, fs.constants.W_OK);
        return true;
    } catch (e) {
        throw new Error(`Cannot read & write on path "${path}". Check permissions!`);
    }
}

const setDefaultOptions = (options) => Object.assign({}, DEFAULT_OPTIONS, options);

const currentDate = () => new Date().toISOString();


module.exports = {
    validateJSON,
    validatePath,
    setDefaultOptions,
    fileExistence,
    createFile,
    fileExists,
    createPath,
    getDB,
    writeDB,
    currentDate
}