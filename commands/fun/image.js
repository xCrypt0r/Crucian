const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');
const { promisify } = require('util');
const gis = promisify(require('g-i-s'));

/**
 * Class to get an image
 *
 * @class Image
 * @extends {Command}
 */
class Image extends Command {
    /**
     * Creates an instance of Image
     *
     * @param {string} file
     */
    constructor(file) {
        super(file);
    }

    /**
     * Get an image and post to channel
     *
     * @param {Message} message
     * @param {string[]} args
     */
    async run(message, args) {
        let keyword = args.join(' '),
            images = await gis(keyword);

        if (images.length < 1) {
            message.reply(bot.lang.imageNotFound.random());

            return;
        }

        let embed = new MessageEmbed()
            .setTitle(keyword)
            .setImage(images.random().url);

        message.channel.send(embed);
    }
}

module.exports = Image;
