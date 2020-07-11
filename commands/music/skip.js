const Command = require('../../structures/Command.js');

class Skip extends Command {
    constructor(file) {
        super(file);
    }

    async run(message) {
        let fetched = bot.active.get(message.guild.id);

        if (!fetched) {
            message.reply(bot.lang.noMusicPlaying);

            return;
        }

        if (message.member.voice.channel !== message.guild.me.voice.channel) {
            message.reply(bot.lang.notInSameVoiceChannel);

            return;
        }

        fetched.queue[0].loop = false;

        fetched.dispatcher.end();
        message.channel.send(bot.lang.skipSuccess);
    }
}

module.exports = Skip;
