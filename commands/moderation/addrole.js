const Command = require('../../structures/Command.js');

class AddRole extends Command {
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

        let roleName = args.pop(),
            role = message.guild.roles.cache.find(role => role.name === roleName);

        if (!role) {
            message.reply(bot.lang.cantFindRole);

            return;
        }

        await member.addRole(role);
        message.channel.send(bot.lang.roleAdded.format(roleName, member.user.tag));
    }
}

module.exports = AddRole;
