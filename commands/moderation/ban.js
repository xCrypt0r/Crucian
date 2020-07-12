const Command = require('../../structures/Command.js');

class Ban extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message, args) {
        if (!message.member.hasPermission('BAN_MEMBERS')) {
            message.reply(bot.lang.lackOfPermission.random());

            return;
        }

        let member = message.mentions.members.first();

        if (!member) {
            message.reply(bot.lang.cantFindUser);

            return;
        }

        if (!member.bannable) {
            message.reply(bot.lang.lackOfPermission.random());

            return;
        }

        let reason = args.slice(1).join(' ');

        member
            .ban(reason)
            .then(() => {
                message.channel.send(bot.lang.banSuccess.random().format(member.user.username, reason));
            })
            .catch(bot.logger.error);
    }
}

module.exports = Ban;
