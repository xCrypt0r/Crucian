const { Console } = require('console');
const { inspect, types } = require('util');
const chalk = require('chalk');
const moment = require('moment');
const inspectOptions = {
    showHidden: true,
    compact: false,
    depth: null,
    colors: true
};

class Logger extends Console {
    static parse(data) {
        return data && types.isNativeError(data)
            ? data.message || data.stack || String(data)
            : Array.isArray(data)
                ? data.map(Logger.parse).join(', ')
                : data !== null && typeof data === 'object'
                    ? '\n' + inspect(data, inspectOptions)
                    : String(data);
    }

    constructor(client) {
        super(process.stdout, process.stderr);

        this.client = client;
        this.template = 'YYYY-MM-DD HH:mm:ss';
    }

    get timestamp() {
        return moment().format(this.template);
    }

    writeLog(data, type = 'log') {
        data = Logger.parse(data);

        super[type](Logger.PAINTS[type](`[${this.timestamp}] ${data}`));
    }

    log(...data) {
        for (let message of data) {
            this.writeLog(message, 'log');
        }
    }

    error(...data) {
        for (let message of data) {
            this.writeLog(message, 'error');
        }
    }

    warn(...data) {
        for (let message of data) {
            this.writeLog(message, 'warn');
        }
    }
}

Logger.PAINTS = {
    log: chalk.green,
    error: chalk.bgRed.bold,
    warn: chalk.black.bgKeyword('orange')
};

module.exports = Logger;
