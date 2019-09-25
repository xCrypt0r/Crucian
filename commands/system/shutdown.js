const Command = require('../../interfaces/Command.js');

class Shutdown extends Command {
    constructor(file) {
        super(file, {
            name: 'shutdown',
            description: 'Shutdown bot',
            usage: 'shutdown',
            aliases: ['turnoff', '꺼져', '끄기'],
            isOwnerOnly: true
        });
    }

    async run(bot) {
        bot.destroy();
    }
}

module.exports = Shutdown;
