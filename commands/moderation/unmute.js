const Command = require('../../structures/Command.js');

class Unmute extends Command {
    constructor(file) {
        super(file);
    }

    async run(message, args) {
        if (!message.member.hasPermission('MANAGE_ROLES')) {
            message.reply(bot.lang.lackOfPermission.random());

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
