const db = require('../lib/db.js');
const moment = require('moment');
const path = require('path');
const commands = require('../assets/json/commands.json');

class Command {
    constructor(file) {
        this.file = file;
        this.name = path.parse(file).name;

        Object.assign(this, commands[this.name]);
    }

    async log(message) {
        let params = [this.name, message.author.id, moment().format('YYYY-MM-DD HH:mm:ss')];
        let cmd = 'INSERT INTO log_commands (name, user, date) VALUES (?, ?, ?)';

        db.query(cmd, params, err => {
            if (err) {
                throw err;
            }
        });
    }
}

module.exports = Command;