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

    if (fetched.dispatcher.paused) {
        message.reply(bot.lang.alreadyPaused.random());

        return;
    }

    fetched.dispatcher.pause();
    message.reply(bot.lang.pauseSuccess.random().format(fetched.queue[0].songTitle));
};

module.exports.config = {
    name: 'pause',
    description: 'Pause currently playing music',
    alias: ['stop', '멈춰', '스탑', '일시정지', '정지'],
    isOwnerOnly: false
};
