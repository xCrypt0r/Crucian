const Command = require('../../structures/Command.js');


class Resume extends Command {
    constructor(...args) {
        super(...args);
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

        if (!fetched.dispatcher.paused) {
            message.reply(bot.lang.notPaused);

            return;
        }

        fetched.dispatcher.resume();
        message.reply(bot.lang.resumeSuccess.format(fetched.queue[0].title));
    }
}

module.exports = Resume;
