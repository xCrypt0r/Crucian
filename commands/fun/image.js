const Command = require('../../structures/Command.js');
const { promisify } = require('util');
const gis = promisify(require('g-i-s'));

class Image extends Command {
    constructor(file) {
        super(file);
    }

    async run(message, args) {
        let images = await gis(args.join(' '));

        if (images.length < 1) {
            message.reply(bot.lang.imageNotFound.random());

            return;
        }

        message.channel.send({
            files:[{
                attachment: images.random().url,
                name: 'image.jpg'
            }]
        });
    }
}

module.exports = Image;
