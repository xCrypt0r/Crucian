const Command = require('../../interfaces/Command.js');
const ms = require('ms');

class Tempmute extends Command {
    constructor(file) {
        super(file, {
            name: 'tempmute',
            description: 'Mutes the mentioned user for given time (example: 3s, 2m, 1h)',
            usage: 'tempmute #{mention} #{time}',
            aliases: [],
            cooltime: 5000,
            isOwnerOnly: false
        });
    }

    async run(bot, message, args) {
        if (!message.member.hasPermission('MANAGE_ROLES')) {
            message.reply(bot.lang.lackOfPermission.random());

            return;
        }

        if (args.length < 2) {
            message.reply(bot.lang.lackOfArguments);
            
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

        let mutedRole = message.guild.roles.find(role => role.name === 'muted');

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
