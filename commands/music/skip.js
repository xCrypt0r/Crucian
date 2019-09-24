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

    bot.active.set(message.guild.id, fetched);
    message.channel.send(bot.lang.skipSuccess);
    fetched.dispatcher.end();
};

module.exports.config = {
    name: 'skip',
    description: 'Skip the song currently playing',
    usage: 'skip',
    alias: ['s', '넘겨', '버려', '치워'],
    isOwnerOnly: false
};
