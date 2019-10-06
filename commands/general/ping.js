const Command = require('../../interfaces/Command.js');

class Ping extends Command {
    constructor(file) {
        super(file, {
            name: 'ping',
            description: 'Show latency and response times',
            usage: 'ping',
            aliases: ['pong', '퐁', '핑'],
            isOwnerOnly: false
        });
    }

    async run(bot, message) {
        let ping = bot.ping.toFixed(1);

        message.reply(bot.lang.pingMessages.random().format(ping));
    }
}

module.exports = Ping;