const Command = require('../../structures/Command.js');

class RemoveRole extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message, args) {
        if (!message.member.hasPermission('MANAGE_ROLES')) {
            message.reply(bot.lang.lackOfPermission.random());

            return;
        }

        let member = message.mentions.members.first() || message.member;

        if (!member) {
            message.reply(bot.lang.cantFindUser);

            return;
        }

        if (member !== message.member && member.hasPermission('MANAGE_MESSAGES')) {
            message.reply(bot.lang.lackOfPermission.random());

            return;
        }

        let roleName = args.pop();

        if (!message.guild.roles.cache.some(role => role.name === roleName)) {
            message.reply(bot.lang.cantFindRole);

            return;
        }

        await member.removeRole(roleName);
        message.channel.send(bot.lang.roleRemoved.format(roleName, member.user.tag));
    }
}

module.exports = RemoveRole;
