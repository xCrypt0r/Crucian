const Command = require('../../structures/Command.js');
const ytdl = require('ytdl-core');
const moment = require('moment');
require('moment-duration-format');

class Play extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message, args) {
        if (!message.member.voice.channel) {
            message.reply(bot.lang.notInVoiceChannel);

            return;
        }

        let url = args[0],
            validate = await ytdl.validateURL(url);

        if (!validate) {
            let searcher = bot.commands.get('search');

            searcher.run(message, args);

            return;
        }

        let unplayable = false;
        let info = await ytdl.getInfo(url).catch(e => {
            unplayable = true;
        });

        if (unplayable) {
            message.reply(bot.lang.unplayableVideo);

            return;
        }

        let data = bot.active.get(message.guild.id) || {};

        if (!data.connection) {
            data.connection = await message.member.voice.channel.join();
        }

        if (!data.queue) {
            data.queue = [];
        }

        data.guildID = message.guild.id;

        let { videoDetails: details } = info,
            title = details.title,
            duration = moment.duration(details.lengthSeconds, 'seconds').format(bot.consts.FORMAT.MUSIC_DURATION),
            requester = message.author.tag;

        data.queue.push({
            title,
            duration,
            requester,
            url,
            announceChannel: message.channel.id,
            loop: false
        });

        !data.dispatcher
            ? this.play(bot, data)
            : message.channel.send(bot.lang.addedToQueue.format(title, requester));

        bot.active.set(message.guild.id, data);
    }

    async play(bot, data) {
        let { announceChannel, title, requester, duration, url } = data.queue[0];

        bot.channels.cache
            .get(announceChannel)
            .send(bot.lang.nowPlaying.format(title, requester, duration));

        data.dispatcher = await data.connection.play(ytdl(url, { filter: 'audioonly' }));
        data.dispatcher.guildID = data.guildID;

        data.dispatcher.on('finish', () => {
            this.finish(bot, data);
        });
    }

    async finish(bot, data) {
        let fetched = bot.active.get(data.guildID);

        if (!fetched.queue[0].loop) {
            fetched.queue.shift();
        }

        fetched.queue.length > 0 ? (
            bot.active.set(data.guildID, fetched),
            this.play(bot, fetched)
        ) : (
            bot.active.delete(data.guildID)
        );
    }
}

module.exports = Play;
