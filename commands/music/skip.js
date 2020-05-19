const Command = require('../../interfaces/Command.js');

class Skip extends Command {
    constructor(file) {
        super(file);
    }

    async run(bot, message) {
        let fetched = bot.active.get(message.guild.id);

        if (!fetched) {
            message.reply(bot.lang.noMusicPlaying);

            return;
        }

        if (message.member.voice.channel !== message.guild.me.voice.channel) {
            message.reply(bot.lang.notInSameVoiceChannel);

            return;
        }

        bot.active.set(message.guild.id, fetched);
        message.channel.send(bot.lang.skipSuccess);
        fetched.dispatcher.end();
    }
}

module.exports = Skip;
