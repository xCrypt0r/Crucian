const Command = require('../../interfaces/Command.js');

class Unmute extends Command {
    constructor(file) {
        super(file, {
            name: 'unmute',
            description: 'Unmutes the mentioned user',
            usage: 'unmute #{mention}',
            aliases: ['채금해제'],
            cooltime: 5000,
            isOwnerOnly: false
        });
    }

    async run(bot, message, args) {
        if (!message.member.hasPermission('MANAGE_ROLES')) {
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

        if (message.guild.member(user).hasPermission('MANAGE_MESSAGES')) {
            message.reply(bot.lang.lackOfPermission.random());

            return;
        }

        let mutedRole = message.guild.roles.cache.find(role => role.name === 'muted');

        if (!mutedRole) {
            message.reply(bot.lang.cantFindRole);

            return;
        }

        bot.tools.removeRole(message, user, mutedRole);
        message.channel.send(bot.lang.unmuteSuccess.format(user.username));
    }
}

module.exports = Unmute;
