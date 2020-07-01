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

        let member = message.mentions.members.first();

        if (!member) {
            message.reply(bot.lang.cantFindUser);

            return;
        }

        if (member.hasPermission('MANAGE_MESSAGES')) {
            message.reply(bot.lang.lackOfPermission.random());

            return;
        }

        let mutedRole = message.guild.roles.cache.find(role => role.name === 'muted');

        if (!mutedRole) {
            message.reply(bot.lang.cantFindRole);

            return;
        }

        member.removeRole(mutedRole);
        message.channel.send(
            bot.lang.unmuteSuccess.format(
                member.user.username
            )
        );
    }
}

module.exports = Unmute;
