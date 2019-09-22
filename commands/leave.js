const lang = require('../data/lang.json');

module.exports.run = async (bot, message, args) => {
    if (!message.guild.me.voiceChannel) {
        message.reply(lang.botNotInVoiceChannel);

        return;
    }

    message.guild.me.voiceChannel.leave();
    message.channel.send(lang.leaveVoiceChannel.random());
};

module.exports.config = {
    name: 'leave',
    description: 'Leave voice channel',
    alias: ['l', '나가'],
    isOwnerOnly: false
};
