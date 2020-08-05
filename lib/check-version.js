const { satisfies, minVersion } = require('semver');
const version = require('../package.json').engines.node;
const logger = new (require('../structures/Logger.js'))();

if (!satisfies(process.versions.node, version)) {
    throw new Error(`Unsupported version of node! Required node version: ${version}`);
} else {
    logger.log(`Node version: ${minVersion(version)}`);
}
