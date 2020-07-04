const Command = require('../../structures/Command.js');

class Reboot extends Command {
    constructor(file) {
        super(file);
    }

    async run(message) {
        await Promise.all([
            bot.destroy(),
            bot.unloadEvents(),
            bot.unloadCommands(),
            bot.login(process.env.TOKEN)]
        );
        message.channel.send(bot.lang.rebootSuccess);
    }
}

module.exports = Reboot;
