const Command = require('../../interfaces/Command.js');

class Resume extends Command {
    constructor(file) {
        super(file, {
            name: 'resume',
            description: 'Resume paused music',
            usage: 'resume',
            aliases: ['다시틀어'],
            isOwnerOnly: false
        });
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

        if (!fetched.dispatcher.paused) {
            message.reply(bot.lang.notPaused);

            return;
        }

        fetched.dispatcher.resume();
        message.reply(bot.lang.resumeSuccess.format(fetched.queue[0].songTitle));
    }
}

module.exports = Resume;
