const Command = require('../../structures/Command.js');
const ms = require('ms');

class Tempmute extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message, args) {
        if (!message.member.hasPermission('MANAGE_ROLES')) {
            message.reply(bot.lang.lackOfPermission.random());

            return;
        }

        let member = message.mentions.members.first(),
            muteTime = ms(args[1]);

        if (!muteTime) {
            message.reply(bot.lang.invalidArguments);

            return;
        }

        if (!member) {
            message.reply(bot.lang.cantFindUser);

            return;
        }

        if (member.hasPermission('MANAGE_MESSAGES')) {
            message.reply(bot.lang.notApplicableForModerator);

            return;
        }

        let mutedRole = message.guild.roles.cache.find(role => role.name === 'muted');

        if (!mutedRole) {
            message.reply(bot.lang.cantFindRole);

            return;
        }

        member.addRole(mutedRole);
        message.channel.send(bot.lang.tempmuteSuccess.format(member.user.username, muteTime));

        bot.setTimeout(() => {
            member.removeRole(mutedRole);
            message.channel.send(bot.lang.unmuteSuccess.format(member.user.username));
        }, muteTime);
    }
}

module.exports = Tempmute;
