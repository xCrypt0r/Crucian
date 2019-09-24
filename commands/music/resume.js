module.exports.run = async (bot, message) => {
    let fetched = bot.active.get(message.guild.id);
    
    if (!fetched) {
        message.reply(bot.lang.noMusicPlaying);

        return;
    }

    if (message.member.voiceChannel !== message.guild.me.voiceChannel) {
        message.reply(bot.lang.notInSameVoiceChannel);

        return;
    }

    if (!fetched.dispatcher.paused) {
        message.reply(bot.lang.notPaused);

        return;
    }

    fetched.dispatcher.resume();
    message.reply(bot.lang.resumeSuccess.format(fetched.queue[0].songTitle));
};

module.exports.config = {
    name: 'resume',
    description: 'Resume paused music',
    usage: 'resume',
    alias: ['다시틀어'],
    isOwnerOnly: false
};
