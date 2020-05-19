const semver = require('semver');
const version = require('../package.json').engines.node;

if (!semver.satisfies(process.versions.node, version)) {
    console.error(`Unsupported version of node! Required node version: ${version}`);
    process.exit(1);
}