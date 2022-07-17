const fs = require('fs');
const path = require('path');
const { DEFAULT_CONTENT } = require('./constants');

// create file if not exists using arrow function
const createDatabase = (path) => {
    if (!fs.existsSync(path)) {
        fs.writeFileSync(path, JSON.stringify(DEFAULT_CONTENT, null, 2));
    }
}

const updateDatabase = (path, data) => {
    data.updated_at = new Date().toISOString();
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

module.exports = {
    createDatabase,
    updateDatabase
}