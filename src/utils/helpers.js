const fs = require('fs');
const fsPath = require('path');
const moment = require('moment');
const { DEFAULT_OPTIONS } = require('./constants');

/**
 * @param {JSON} json
 * @returns {boolean}
 */
const validateJSON = (json) => {
  try {
    JSON.parse(json);
    return true;
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @param {string} path
 * @returns {string}
 */
const validatePath = (path) => {
  if (!path || !path.length) {
    throw new Error('Path is required');
  } else {
    return path;
  }
};

/**
 * @param {string} path
 * @returns {string}
 */
const createPath = (path) => fsPath.join(process.cwd(), validatePath(path));

/**
 * @param {string} path
 * @returns {JSON}
 */
const getDB = (path) => {
  let db = {};
  let stats = fs.statSync(path);
  if (stats.size > 0) {
    let json;
    try {
      json = fs.readFileSync(path, 'utf8');
    } catch (e) {
      throw e;
    }
    if (validateJSON(json)) db = JSON.parse(json);
  }
  return db;
};

/**
 * @param {Object} options
 * @returns {any}
 */
const setDefaultOptions = (options) =>
  Object.assign({}, DEFAULT_OPTIONS, options);

/**
 * @returns {string}
 */
const currentDate = () => new Date().toISOString();

/**
 * @param {string} date
 * @returns {string}
 */
const timeSince = (date) => {
  const from = new Date(date);

  return moment(from).fromNow();
};

/**
 * @param {string} path
 * @param {number} toFixed
 * @returns {{mb: number, byte: number, kb: number, gb: number}}
 */
const getFileSize = (path, toFixed) => {
    const stats = fs.statSync(path);
    const fileSizeInBytes = stats.size;
    const fileSizeInKb = fileSizeInBytes / 1024;
    const fileSizeInMb = fileSizeInKb / 1024;
    const fileSizeInGb = fileSizeInMb / 1024;

    return {
      byte: `${fileSizeInBytes}`,
      kb: `${fileSizeInKb.toFixed(toFixed)}`,
      mb: `${fileSizeInMb.toFixed(toFixed)}`,
      gb: `${fileSizeInGb.toFixed(toFixed)}`
    };
}

module.exports = {
  validateJSON,
  validatePath,
  setDefaultOptions,
  createPath,
  getDB,
  currentDate,
  timeSince,
  getFileSize
};
