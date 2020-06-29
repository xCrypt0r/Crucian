const Command = require('../../structures/Command.js');

class Mute extends Command {
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
            try {
                mutedRole = await bot.tools.createRole(message, 'muted', {
                    permissions: []
                });

                message.guild.channels.cache.forEach(async (channel) => {
                    await channel.createOverwrite(mutedRole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            } catch (err) {
                bot.logger.error(err);
            }
        }

        bot.tools.addRole(message, user, mutedRole);
        message.channel.send(bot.lang.muteSuccess.random().format(user.username));
    }
}

module.exports = Mute;
