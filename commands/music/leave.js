const Command = require('../../structures/Command.js');

class Leave extends Command {
    constructor(file) {
        super(file);
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
