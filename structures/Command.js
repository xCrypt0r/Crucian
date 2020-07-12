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
        let timestamp = message.createdTimestamp;

        bot.usage.set(`${message.member.fullId}-${timestamp}`, {
            id: message.author.id,
            guild: message.guild.id,
            command: this.name,
            timestamp
        });
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
