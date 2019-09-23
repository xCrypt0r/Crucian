const search = require('yt-search');

module.exports.run = async (bot, message, args, tools, options) => {
    if (args.length < 1) {
        message.reply(bot.lang.lackOfArguments);

        return;
    }

    search(args.join(' '), (err, res) => {
        if (err) {
            console.error(err);

            return;
        }

        let videos = res.videos.slice(0, bot.config.YOUTUBE_SEARCH_LIMIT);
        let videos_chunks = videos
            .map((video, i) => `\`${Number(i) + 1}. ${video.title}\``)
            .chunk(10)
            .map(chunk => chunk.join('\n'));
        let embedOptions = {
            title: bot.lang.selectSong.format(videos.length),
            thumbnail: bot.user.avatarURL
        };

        tools.page(message, videos_chunks, embedOptions);

        let filter = collectedMessage => message.author === collectedMessage.author
            && (!isNaN(collectedMessage.content) 
            && collectedMessage.content < videos.length + 1 
            && collectedMessage.content > 0
            || collectedMessage.content === 'c');
        let collector = message.channel.createMessageCollector(filter);

        collector.videos = videos;
        collector.once('collect', collectedMessage => {
            let player = require('./play.js');

            if (collectedMessage.content === 'c') {
                message.channel.send(bot.lang.songSelectCancelled);

                return;
            }

            player.run(bot, message, [videos[Number(collectedMessage.content) - 1].url], tools, options);
        });
    });
};

module.exports.config = {
    name: 'search',
    description: 'Search music from youtube',
    alias: ['검색', '찾아'],
    cooltime: 4000,
    isOwnerOnly: false
};
