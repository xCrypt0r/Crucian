const path = require('path');
const commands = require('../assets/json/commands.json');

class Command {
    constructor(file) {
        this.file = file;
        this.name = path.parse(file).name;

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

    cool(command, member, cooldown) {
        if (cooldown) {
            bot.cooldown[command] = bot.cooldown[command] || new Set();

            bot.cooldown[command].add(member.fullId);
            bot.setTimeout(() => {
                bot.cooldown[command].delete(member.fullId);
            }, cooldown);
        }

        return this;
    }
}

module.exports = Command;
