const Command = require('../../structures/Command.js');

class NowPlaying extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message) {
        let fetched = bot.active.get(message.guild.id);

        if (!fetched) {
            message.reply(bot.lang.noMusicPlaying);

            return;
        }

        let { title, requester, duration } = fetched.queue[0];

        message.reply(bot.lang.nowPlaying.format(title, requester, duration));
    }
}

module.exports = NowPlaying;
