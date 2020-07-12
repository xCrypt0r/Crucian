const Command = require('../../structures/Command.js');

class Queue extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message) {
        let fetched = bot.active.get(message.guild.id);

        if (!fetched) {
            message.reply(bot.lang.noMusicPlaying);

            return;
        }

        let queue = fetched.queue.map((music, i) => {
            return bot.lang.songInQueue.format(i + 1, music.title, music.requester);
        });
        let queueChunks = queue.chunk(10).map(chunk => chunk.join('\n'));
        let embedOptions = {
            title: bot.lang.displayQueue,
            thumbnail: bot.user.avatarURL
        };

        bot.tools.page(message, queueChunks, embedOptions);
    }
}

module.exports = Queue;
