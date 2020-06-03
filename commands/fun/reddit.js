const Command = require('../../interfaces/Command.js');
const discord = require('discord.js');
const request = require('request');
const moment = require('moment');

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
        let rgx_subreddit = /^[A-Za-z0-9][A-Za-z0-9_]{1,20}$/;

        if (!rgx_subreddit.test(subreddit)) {
            message.reply(bot.lang.invalidArguments);

            return;
        }

        request({
            url: `https://www.reddit.com/r/${subreddit}/new.json`,
            json: true
        }, (err, res, body) => {
            if (body.error) {
                message.reply(bot.lang.somethingWentWrong.random());

                return;
            }

            if (body.data.dist === 0) {
                message.reply(bot.lang.resultNotFound.random());

                return;
            }

            let article = body.data.children.random().data;

            if (!message.channel.nsfw && article.over_18) {
                message.reply(bot.lang.notInNsfwChannel.random());

                return;
            }

            let embed = new discord.MessageEmbed()
                .setColor(0xff4301)
                .setTitle(article.title)
                .setURL(`https://www.reddit.com${article.permalink}`)
                .setThumbnail(bot.user.avatarURL())
                .addField('Subreddit', article.subreddit, true)
                .addField('Author', article.author, true)
                .addField('Created At', moment(article.created * 1000).format('YYYY-MM-DD HH:mm:ss'), true)
                .addField('Score', article.score, true);

            message.channel.send(embed).then(() => {
                message.channel.send(article.url);
            });
        });
    }
}

module.exports = Reddit;
