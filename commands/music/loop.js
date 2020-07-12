const Command = require('../../structures/Command.js');

class Loop extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message, args) {
        let fetched = bot.active.get(message.guild.id);

        if (!fetched) {
            message.reply(bot.lang.noMusicPlaying);

            return;
        }

        let nowPlaying = fetched.queue[0],
            { title, announceChannel } = nowPlaying;

        nowPlaying.loop = !nowPlaying.loop;

        bot.channels.cache
            .get(nowPlaying.announceChannel)
            .send(bot.lang[nowPlaying.loop ? 'startLoop' : 'stopLoop'].format(title));
    }
}

module.exports = Loop;