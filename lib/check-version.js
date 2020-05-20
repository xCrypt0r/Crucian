const semver = require('semver');
const version = require('../package.json').engines.node;
const logger = new (require('../interfaces/Logger.js'))();

if (!semver.satisfies(process.versions.node, version)) {
    logger.error(`Unsupported version of node! Required node version: ${version}`);
    process.exit(1);
}
