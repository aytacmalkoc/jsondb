const fs = require('fs');
const fsPath = require('path');
const { DEFAULT_CONTENT } = require('./constants');

/**
 * @param {string} path
 * @param {boolean} minify
 */
const createDatabase = (path, minify) => {
  if (!fs.existsSync(path)) {
    ensureDirectoryExistence(path);
    const data = minify ? JSON.stringify(DEFAULT_CONTENT) : JSON.stringify(DEFAULT_CONTENT, null, 2);
    fs.writeFileSync(path, data);
  }
};

/**
 * @param {string} path
 * @returns {boolean}
 */
const ensureDirectoryExistence = (path) => {
  const dirname = fsPath.dirname(path);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
};

/**
 * @param {string} path
 * @param {Object} data
 * @param {boolean} minify
 */
const updateDatabase = (path, data, minify) => {
  data.updated_at = new Date().toISOString();
  const json = minify ? JSON.stringify(data) : JSON.stringify(data, null, 2);

  fs.writeFileSync(path, json);
};

module.exports = {
  createDatabase,
  updateDatabase
};
