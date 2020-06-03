const Command = require('../../interfaces/Command.js');

class Kick extends Command {
    constructor(file) {
        super(file);
    }

    async run(message, args) {
        if (!message.member.hasPermission('KICK_MEMBERS')) {
            message.reply(bot.lang.lackOfPermission.random());

            return;
        }

        if (args.length < 1) {
            message.reply(bot.lang.lackOfArguments);

            return;
        }

        let user = message.mentions.users.first();

        if (!user) {
            message.reply(bot.lang.cantFindUser);

            return;
        }

        if (!message.guild.member(user).kickable) {
            message.reply(bot.lang.lackOfPermission.random());

            return;
        }

        let reason = args.slice(1).join(' ');

        message.guild.member(user)
            .kick(reason)
            .then(() => {
                message.channel.send(bot.lang.kickSuccess.random().format(user.username, reason));
            })
            .catch(bot.logger.error);
    }
}

module.exports = Kick;
