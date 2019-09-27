const Command = require('../../interfaces/Command.js');

class Reboot extends Command {
    constructor(file) {
        super(file, {
            name: 'reboot',
            description: 'Reboot bot',
            usage: 'reboot',
            aliases: ['재부팅'],
            isOwnerOnly: true
        });
    }

    async run(bot, message) {
        bot.destroy();
        bot.commands.clear();
        await Promise.all([bot.unloadCommands(), bot.login(process.env.TOKEN)]);
        message.channel.send(bot.lang.rebootSuccess);
    }
}

module.exports = Reboot;
