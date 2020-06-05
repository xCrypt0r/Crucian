const Command = require('../../structures/Command.js');

class Reboot extends Command {
    constructor(file) {
        super(file);
    }

    async run(message) {
        bot.destroy();
        bot.commands.clear();
        await Promise.all([bot.unloadCommands(), bot.login(process.env.TOKEN)]);
        message.channel.send(bot.lang.rebootSuccess);
    }
}

module.exports = Reboot;
