const Command = require('../../interfaces/Command.js');

class Leave extends Command {
    constructor(file) {
        super(file, {
            name: 'leave',
            description: 'Leave voice channel',
            usage: 'leave',
            aliases: ['l', '나가'],
            isOwnerOnly: false
        });
    }

    async run(bot, message) {
        if (!message.guild.me.voiceChannel) {
            message.reply(bot.lang.botNotInVoiceChannel);
    
            return;
        }
    
        message.guild.me.voiceChannel.leave();
        message.channel.send(bot.lang.leaveVoiceChannel.random());
    }
}

module.exports = Leave;
