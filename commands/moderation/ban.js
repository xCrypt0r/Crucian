const Command = require('../../interfaces/Command.js');

class Ban extends Command {
    constructor(file) {
        super(file, {
            name: 'ban',
            description: 'Ban user from server',
            usage: 'ban #{mention} #{reason}',
            aliases: ['block', '밴', '차단'],
            cooltime: 5000,
            isOwnerOnly: true
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

        let user = message.mentions.users.first();

        if (!user) {
            message.reply(bot.lang.cantFindUser);

            return;
        }

        if (!message.guild.member(user).bannable) {
            message.reply(bot.lang.lackOfPermission.random());

            return;
        }

        let reason = args.slice(1).join(' ');

        message.guild.member(user)
            .ban(reason)
            .then(() => {
                message.channel.send(bot.lang.banSuccess.random().format(user.username, reason));
            })
            .catch(console.error);
    }
}

module.exports = Ban;