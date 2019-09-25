const Command = require('../../interfaces/Command.js');

class Queue extends Command {
    constructor(file) {
        super(file, {
            name: 'queue',
            description: 'Show songs in queue',
            usage: 'queue',
            aliases: ['q', '목록', '큐'],
            cooltime: 2000,
            isOwnerOnly: false
        });
    }

    async run(bot, message) {
        let fetched = bot.active.get(message.guild.id);
    
        if (!fetched) {
            message.reply(bot.lang.noMusicPlaying);

            return;
        }

        let queue = fetched.queue.map((music, i) => {
            return bot.lang.songInQueue.format(i + 1, music.songTitle, music.requester);
        });
        let queue_chunks = queue.chunk(10).map(chunk => chunk.join('\n'));
        let embedOptions = {
            title: bot.lang.displayQueue,
            thumbnail: bot.user.avatarURL
        };

        bot.tools.page(message, queue_chunks, embedOptions);
    }
}

module.exports = Queue;