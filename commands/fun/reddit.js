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

        let subreddit = args.join('');

        if (!new RegExp(bot.consts.SUBREDDIT_REGEXP).test(subreddit)) {
            message.reply(bot.lang.invalidArguments);

            return;
        }

        let { body } = await request({
            url: bot.consts.REDDIT_HOT_URL.format(subreddit),
            json: true
        });

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
            image = bot.consts.MEDIA_EXTENSION.includes(article.url.slice(-4))
                ? article.url
                : article.thumbnail && !bot.consts.REDDIT_INVALID_THUMBNAIL.includes(article.thumbnail)
                    ? article.thumbnail
                    : article.preview
                        ? article.preview.images[0].source.url
                        : null;
        let { body: { data: { icon_img: icon } } } = await request({
            url: bot.consts.REDDIT_USER_URL.format(article.author),
            json: true,
            headers: bot.consts.REDDIT_HEADERS
        });
        let embed = new discord.MessageEmbed()
            .setColor(bot.consts.REDDIT_EMBED_COLOR)
            .setTitle(article.title)
            .setURL(bot.consts.REDDIT_ARTICLE_URL.format(article.permalink))
            .setAuthor(
                bot.consts.REDDIT_AUTHOR_WITH_PREFIX.format(article.author),
                icon.split('?')[0],
                bot.consts.REDDIT_AUTHOR_URL.format(article.author)
            )
            .setImage(image)
            .setTimestamp(timestamp)
            .addFields(
                {
                    name: bot.lang.redditUpvotes.name,
                    value: bot.lang.redditUpvotes.value.format(article.ups),
                    inline: true
                },
                { 
                    name: bot.lang.redditComments.name,
                    value: bot.lang.redditComments.value.format(article.num_comments),
                    inline: true 
                }
            );

        message.channel.send(embed);
    }
}

module.exports = Reddit;
