const Command = require('../../structures/Command.js');

class Reboot extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message) {
        await Promise.all([
            bot.destroy(),
            bot.login(process.env.TOKEN)]
        );
        message.channel.send(bot.lang.rebootSuccess);
    }
}

module.exports = Reboot;
