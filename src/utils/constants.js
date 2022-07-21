/**
 * @type {{minify: boolean, uuid: boolean, primaryKey: string, timestamp: boolean}}
 */
const DEFAULT_OPTIONS = {
    uuid: true,
    primaryKey: 'id',
    minify: false,
    timestamp: true
}

/**
 * @type {{updated_at: string, data: {}, created_at: string, version: number}}
 */
const DEFAULT_CONTENT = {
    version: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: {}
}

module.exports = {
    DEFAULT_OPTIONS,
    DEFAULT_CONTENT
}
