const Command = require('../../structures/Command.js');

class Lock extends Command {
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
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            bot.logger.error(e);
        }

        message.channel.send(bot.lang.lockSuccess.format(channel.name));
    }
}

module.exports = Lock;
