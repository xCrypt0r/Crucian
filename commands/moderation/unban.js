const Command = require('../../interfaces/Command.js');

class Unban extends Command {
    constructor(file) {
        super(file, {
            name: 'unban',
            description: 'Ban user from server',
            usage: 'unban #{id} #{reason}',
            aliases: ['unblock', '밴해제', '차단해제'],
            cooltime: 5000,
            isOwnerOnly: false
        });
    }

    async run(bot, message, args) {
        if (!message.member.hasPermission('BAN_MEMBERS')) {
            message.reply(bot.lang.lackOfPermission.random());

            return;
        }

        if (args.length < 1) {
            message.reply(bot.lang.lackOfArguments);
            
            return;
        }

        let userID = args[0];
        let bannedMember = await bot.fetchUser(userID);

        if (!bannedMember) {
            message.reply(bot.lang.cantFindUser);

            return;
        }

        let reason = args.slice(1).join(' ');

        message.guild
            .unban(bannedMember, reason)
            .then(() => {
                message.channel.send(bot.lang.unbanSuccess.random().format(bannedMember.username, reason));
            })
            .catch(console.error);
    }
}

module.exports = Unban;