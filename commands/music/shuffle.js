const Command = require('../../interfaces/Command.js');

class Shuffle extends Command {
    constructor(file) {
        super(file, {
            name: 'shuffle',
            description: 'Shuffle songs in queue',
            usage: 'shuffle',
            aliases: ['random', 'randomize', 'sh', '랜덤', '셔플'],
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

        let nowPlaying = fetched.queue.shift();

        fetched.queue = fetched.queue.shuffle();

        fetched.queue.unshift(nowPlaying);
        message.reply(bot.lang.shuffleCompleted.random());
    }
}

module.exports = Shuffle;
