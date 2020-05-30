const Command = require('../../interfaces/Command.js');

class Prefix extends Command {
    constructor(file) {
        super(file);
    }

    async run(bot, message, args) {      
        if (!message.member.hasPermission('MANAGE_GUILD')) {
            message.reply(bot.lang.lackOfPermission.random());

            return;
        }

        args.length > 0 ? (
            bot.prefix = args[0],
            message.channel.send(bot.lang.prefixChanged.format(bot.prefix))
        ) : (
            message.channel.send(bot.lang.currentPrefix.format(bot.prefix))
        );
    }
}

module.exports = Prefix;
