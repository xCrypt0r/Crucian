const Command = require('../../structures/Command.js');

class Leave extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message) {
        if (!message.guild.me.voice.channel) {
            message.reply(bot.lang.botNotInVoiceChannel);

            return;
        }

        bot.active.delete(message.guild.id);
        message.guild.me.voice.channel.leave();
        message.channel.send(bot.lang.leaveVoiceChannel.random());
    }
}

module.exports = Leave;
