const lang = require('../data/lang.json');

module.exports.run = async (bot, message, args, tools, options) => {
    let fetched = options.active.get(message.guild.id);

    if (!fetched) {
        message.reply(lang.noMusicPlaying);

        return;
    }

    if (message.member.voiceChannel !== message.guild.me.voiceChannel) {
        message.reply(lang.notInSameVoiceChannel);

        return;
    }

    options.active.set(message.guild.id, fetched);
    message.channel.send(lang.skipSuccess);
    fetched.dispatcher.end();
};

module.exports.config = {
    name: 'skip',
    description: 'Skip the song currently playing',
    alias: ['k', 'kill', '넘겨', '버려', '치워'],
    isOwnerOnly: false
};
