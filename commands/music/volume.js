const Command = require('../../structures/Command.js');

class Volume extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message, args) {
        let volume = Number(args[0]);

        if (!Number.isInteger(volume) || volume < 0 || volume > 200) {
            message.reply(bot.lang.invalidArguments);

            return;
        }

        let fetched = bot.active.get(message.guild.id);

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
    }
}

module.exports = Volume;
