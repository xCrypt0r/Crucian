const Command = require('../../structures/Command.js');
const discord = require('discord.js');
const { promisify } = require('util');
const request = promisify(require('request'));

class Reddit extends Command {
    constructor(file) {
        super(file);
    }

    async run(message, args) {
        if (args.length < 1) {
            message.reply(bot.lang.lackOfArguments);
    
            return;
        }

        let subreddit = args.join(''),
            rgx_subreddit = /^[A-Za-z0-9][A-Za-z0-9_]{1,20}$/,
            url = `https://www.reddit.com/r/${subreddit}/hot.json`;

        if (!rgx_subreddit.test(subreddit)) {
            message.reply(bot.lang.invalidArguments);

            return;
        }

        let { body } = await request({ url: url, json: true });

        if (body.error) {
            message.reply(bot.lang.somethingWentWrong.random());

            return;
        }

        if (body.data.dist <= 0) {
            message.reply(bot.lang.resultNotFound.random());

            return;
        }

        let article = body.data.children.random().data;

        if (!message.channel.nsfw && article.over_18) {
            message.reply(bot.lang.notInNsfwChannel.random());

            return;
        }
        
        let timestamp = new Date(article.created * 1000),
            headers = { 'User-Agent': 'reddit-oauth/1.1.1' },
            userUrl = `https://www.reddit.com/user/${article.author}/about.json`,
            { body: { data: { icon_img: icon } } } = await request({ url: userUrl, json: true, headers: headers }),
            image = ['.jpg', '.png', '.svg', '.mp4', '.gif'].includes(article.url.slice(-4))
                ? article.url
                : article.thumbnail && !['self', 'spoiler'].includes(article.thumbnail)
                    ? article.thumbnail
                    : article.preview
                        ? article.preview.images[0].source.url
                        : null;

        let embed = new discord.MessageEmbed()
            .setColor(0xff4301)
            .setTitle(article.title)
            .setURL(`https://www.reddit.com${article.permalink}`)
            .setAuthor(`u/${article.author}`, icon.split('?')[0], `https://reddit.com/user/${article.author}`)
            .setImage(image)
            .setTimestamp(timestamp)
            .addFields(
                { name: 'upvotes', value: `:thumbsup: ${article.ups} people`, inline: true },
                { name: 'comments', value: `:newspaper: ${article.num_comments} comments`, inline: true }
            );

        message.channel.send(embed);
    }
}

module.exports = Reddit;
