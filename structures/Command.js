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
        let params = [
            message.guild.id,
            message.author.id,
            this.name,
            moment().format('YYYY-MM-DD HH:mm:ss')
        ];
        let cmd = 'INSERT INTO log_commands(server, user, command, date) VALUES(?, ?, ?, ?)';

        db.run(cmd, params, err => {
            if (err) {
                bot.logger.error(err);
            }
        });
    }
}

module.exports = Command;
