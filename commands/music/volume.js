module.exports.run = async (bot, message, args, tools, options) => {
    if (args.length < 1) {
        message.reply(bot.lang.lackOfArguments);

        return;
    }

    let volume = Number(args[0]);

    if (!Number.isInteger(volume) || volume < 0 || volume > 200) {
        message.reply(bot.lang.invalidArguments);

        return;
    }

    let fetched = options.active.get(message.guild.id);
    
    if (!fetched) {
        message.reply(bot.lang.noMusicPlaying);

        return;
    }

    if (message.member.voiceChannel !== message.guild.me.voiceChannel) {
        message.reply(bot.lang.notInSameVoiceChannel);

        return;
    }

    fetched.dispatcher.setVolume(volume / 100);
    message.reply(bot.lang.setVolumeSuccess.format(volume));
};

module.exports.config = {
    name: 'volume',
    description: 'Adjust speaking volume (range: 0~200)',
    alias: ['볼륨', '음량'],
    isOwnerOnly: false
};
