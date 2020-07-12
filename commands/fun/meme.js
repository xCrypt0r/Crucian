const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');
const api = require('imageapi.js');

class Meme extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message) {
        let subreddit = bot.consts.REDDIT_MEME_SUBREDDIT.random(),
            image = await api(subreddit),
            embed = new MessageEmbed()
                .setTitle(bot.lang.memeTitle.format(subreddit))
                .setColor(bot.consts.COLOR.REDDIT_MEME)
                .setImage(image);

        message.channel.send(embed);
    }
}

module.exports = Meme;
