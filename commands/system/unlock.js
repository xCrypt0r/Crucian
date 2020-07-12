const Command = require('../../structures/Command.js');

class Unlock extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message, args) {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) {
            message.reply(bot.lang.lackOfPermission.random());

            return;
        }

        let channel = message.channel;

        try {
            message.guild.roles.cache.forEach(role => {
                channel.createOverwrite(role, {
                    SEND_MESSAGES: true,
                    ADD_REACTIONS: true
                });
            });
        } catch (e) {
            bot.logger.error(e);
        }

        message.channel.send(bot.lang.unlockSuccess.format(channel.name));
    }
}

module.exports = Unlock;
