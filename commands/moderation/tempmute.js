const Command = require('../../structures/Command.js');
const ms = require('ms');

class Tempmute extends Command {
    constructor(file) {
        super(file);
    }

    async run(message, args) {
        if (!message.member.hasPermission('MANAGE_ROLES')) {
            message.reply(bot.lang.lackOfPermission.random());

            return;
        }

        let user = message.mentions.users.first();
        let muteTime = ms(args[1]);

        if (!muteTime) {
            message.reply(bot.lang.invalidArguments);

            return;
        }

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

        bot.tools.addRole(message, user, mutedRole);
        message.channel.send(bot.lang.tempmuteSuccess.format(user.username, muteTime));

        setTimeout(() => {
            bot.tools.removeRole(message, user, mutedRole);
            message.channel.send(bot.lang.unmuteSuccess.format(user.username));
        }, muteTime);
    }
}

module.exports = Tempmute;
