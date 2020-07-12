const Command = require('../../structures/Command.js');

class Shuffle extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message) {
        let fetched = bot.active.get(message.guild.id);

        if (!fetched) {
            message.reply(bot.lang.noMusicPlaying);

            return;
        }

        let nowPlaying = fetched.queue.shift();

        fetched.queue = fetched.queue.shuffle();

        fetched.queue.unshift(nowPlaying);
        message.reply(bot.lang.shuffleCompleted.random());
    }
}

module.exports = Shuffle;
