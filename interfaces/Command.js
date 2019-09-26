const db = require('../lib/db.js');
const moment = require('moment');

class Command {
    constructor(file, options = {}) {
        this.file = file;
        this.name = options.name || file.name;
        this.description = options.description || 'No description provided';
        this.usage = options.usage || 'No usage provided';
        this.aliases = options.aliases || [];
        this.cooltime = options.cooltime || 0;
        this.isOwnerOnly = options.isOwnerOnly;
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