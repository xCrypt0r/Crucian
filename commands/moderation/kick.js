const Command = require('../../structures/Command.js');

class Kick extends Command {
    constructor(file) {
        super(file);
    }

    async run(message, args) {
        if (!message.member.hasPermission('KICK_MEMBERS')) {
            message.reply(bot.lang.lackOfPermission.random());

            return;
        }

        let member = message.mentions.members.first();

        if (!member) {
            message.reply(bot.lang.cantFindUser);

            return;
        }

        if (!member.kickable) {
            message.reply(bot.lang.lackOfPermission.random());

            return;
        }

        let reason = args.slice(1).join(' ');

        member
            .kick(reason)
            .then(() => {
                message.channel.send(bot.lang.kickSuccess.random().format(member.user.username, reason));
            })
            .catch(bot.logger.error);
    }
}

module.exports = Kick;
