const Command = require('../../structures/Command.js');

class Mute extends Command {
    constructor(...args) {
        super(...args);
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
            try {
                mutedRole = await message.guild.createRole('muted', {
                    permissions: []
                });

                message.guild.channels.cache.forEach(async channel => {
                    await channel.createOverwrite(mutedRole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            } catch (e) {
                bot.logger.error(e);
            }
        }

        member.addRole(mutedRole);
        message.channel.send(
            bot.lang.muteSuccess.random().format(
                member.user.username
            )
        );
    }
}

module.exports = Mute;
