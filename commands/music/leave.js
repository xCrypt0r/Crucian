const Command = require('../../interfaces/Command.js');

class Leave extends Command {
    constructor(file) {
        super(file);
    }

    async run(bot, message) {
        if (!message.guild.me.voice.channel) {
            message.reply(bot.lang.botNotInVoiceChannel);
    
            return;
        }
    
        message.guild.me.voice.channel.leave();
        message.channel.send(bot.lang.leaveVoiceChannel.random());
    }
}

module.exports = Leave;
