const fs = require('fs');
const fsPath = require('path');
const { DEFAULT_CONTENT } = require('./constants');

// create file if not exists using arrow function
const createDatabase = (path) => {
    if (!fs.existsSync(path)) {
        ensureDirectoryExistence(path);
        fs.writeFileSync(path, JSON.stringify(DEFAULT_CONTENT, null, 2));
    }
}

const ensureDirectoryExistence = (path) => {
    const dirname = fsPath.dirname(path);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

const updateDatabase = (path, data) => {
    data.updated_at = new Date().toISOString();
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

module.exports = {
    createDatabase,
    updateDatabase
}