const Command = require('../../structures/Command.js');

class Unban extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message, args) {
        if (!message.member.hasPermission('BAN_MEMBERS')) {
            message.reply(bot.lang.lackOfPermission.random());

            return;
        }

        let userID = args[0],
            bannedMember = await bot.users.fetch(userID);

        if (!bannedMember) {
            message.reply(bot.lang.cantFindUser);

            return;
        }

        let reason = args.slice(1).join(' ');

        message.guild.members
            .unban(bannedMember, reason)
            .then(() => {
                message.channel.send(bot.lang.unbanSuccess.random().format(bannedMember.username, reason));
            })
            .catch(bot.logger.error);
    }
}

module.exports = Unban;
