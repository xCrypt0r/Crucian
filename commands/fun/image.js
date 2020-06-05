const Command = require('../../structures/Command.js');
const discord = require('discord.js');
const gis = require('g-i-s');

class Image extends Command {
    constructor(file) {
        super(file);
    }

    async run(message, args) {
        if (args.length < 1) {
            message.reply(bot.lang.lackOfArguments);
    
            return;
        }
    
        let q = args.join(' ');

        gis(q, (err, images) => {   
            if (images.length < 1) {
                message.reply(bot.lang.imageNotFound.random());
    
                return;
            }
	
            let image = images.random();
            let embed = new discord.MessageEmbed()
                .setColor('#ff9900')
                .setTitle(`:frame_photo: **${q}**`)
                .setImage(image.url);
    
            message.channel.send(embed);
        });
    }
}

module.exports = Image;
