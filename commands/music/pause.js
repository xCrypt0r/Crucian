const Command = require('../../interfaces/Command.js');

class Pause extends Command {
    constructor(file) {
        super(file, {
            name: 'pause',
            description: 'Pause currently playing music',
            usage: 'pause',
            aliases: ['stop', '멈춰', '스탑', '일시정지', '정지'],
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

        if (fetched.dispatcher.paused) {
            message.reply(bot.lang.alreadyPaused.random());

            return;
        }

        fetched.dispatcher.pause();
        message.reply(bot.lang.pauseSuccess.random().format(fetched.queue[0].songTitle));
    }
}

module.exports = Pause;
