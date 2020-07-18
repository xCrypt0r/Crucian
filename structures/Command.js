const LogModel = require('../models/Log.js');
const path = require('path');
const commands = require('../assets/json/commands.json');

class Command {
    constructor(client, file) {
        this.client = client;
        this.file = file;
        this.name = path.parse(file).name;
        this.store = client.store;

        Object.assign(this, commands[this.name]);
    }

    async log(message) {
        let newLog = new LogModel({ command: this.name, fullId: message.member.fullId });

        await newLog.save();
    }

    async cool(command, member, cooldown) {
        if (cooldown) {
            bot.cooldown[command] = bot.cooldown[command] || new Set();

            bot.cooldown[command].add(member.fullId);
            bot.setTimeout(() => {
                bot.cooldown[command].delete(member.fullId);
            }, cooldown);
        }

        return this;
    }

    reload() {
        return this.store.load(this.file);
    }
}

module.exports = Command;
