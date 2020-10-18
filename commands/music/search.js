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

            let videos = res.videos.slice(0, 30),
                videosChunks = videos
                    .map((video, i) => `\`${Number(i) + 1}. ${video.title}\``)
                    .chunk(10)
                    .map(chunk => chunk.join('\n'));
            let embedOptions = {
                title: bot.lang.selectSong.format(videos.length),
                thumbnail: bot.user.avatarURL
            };
            let messagePromise = bot.tools.page(message, videosChunks, embedOptions);
            let filter = ({ author, content }) => message.author === author
                && (!isNaN(content)
                && content < videos.length + 1
                && content > 0
                || content === 'c');
            let collector = message.channel.createMessageCollector(filter);

            messagePromise.then(message => {
                message.collectors.push(collector);
            });

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
