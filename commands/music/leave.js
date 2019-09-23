module.exports.run = async (bot, message, args) => {
    if (!message.guild.me.voiceChannel) {
        message.reply(bot.lang.botNotInVoiceChannel);

        return;
    }

    message.guild.me.voiceChannel.leave();
    message.channel.send(bot.lang.leaveVoiceChannel.random());
};

module.exports.config = {
    name: 'leave',
    description: 'Leave voice channel',
    alias: ['l', '나가'],
    isOwnerOnly: false
};
