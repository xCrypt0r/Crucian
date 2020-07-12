const Command = require('../../structures/Command.js');
const search = require('yt-search');

class Search extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message, args) {
        search(args.join(' '), (err, res) => {
            if (err) {
                bot.logger.error(err);

                return;
            }

            let videos = res.videos.slice(0, bot.config.get(message.guild.id, 'youtubeSearchLimit')),
                videosChunks = videos
                    .map((video, i) => `\`${Number(i) + 1}. ${video.title}\``)
                    .chunk(10)
                    .map(chunk => chunk.join('\n'));
            let embedOptions = {
                title: bot.lang.selectSong.format(videos.length),
                thumbnail: bot.user.avatarURL
            };

            let messagePromise = bot.tools.page(message, videosChunks, embedOptions);

            let filter = collectedMessage => message.author === collectedMessage.author
                && (!isNaN(collectedMessage.content)
                && collectedMessage.content < videos.length + 1
                && collectedMessage.content > 0
                || collectedMessage.content === 'c');
            let collector = message.channel.createMessageCollector(filter);

            collector.videos = videos;
            collector.once('collect', collectedMessage => {
                let player = bot.commands.get('play');

                messagePromise.then(message => {
                    message.delete();
                });

                if (collectedMessage.content === 'c') {
                    message.channel.send(bot.lang.songSelectCancelled);

                    return;
                }

                player.run(message, [videos[Number(collectedMessage.content) - 1].url]);
                collectedMessage.delete();
            });
        });
    }
}

module.exports = Search;
