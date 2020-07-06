const Command = require('../../structures/Command.js');

class Prefix extends Command {
    constructor(file) {
        super(file);
    }

    async run(message, args) {      
        if (!message.member.hasPermission('MANAGE_GUILD')) {
            message.reply(bot.lang.lackOfPermission.random());

            return;
        }
        
        let guild = message.guild,
            prefix = args[0];

        args.length > 0 ? (
            bot.config.set(guild.id, prefix, 'prefix'),
            message.channel.send(bot.lang.prefixChanged.format(prefix))
        ) : (
            message.channel.send(bot.lang.currentPrefix.format(bot.config.get(guild.id, 'prefix')))
        );
    }
}

module.exports = Prefix;
