const Command = require('../../interfaces/Command.js');
const discord = require('discord.js');
const request = require('request');

class Image extends Command {
    constructor(file) {
        super(file, {
            name: 'image',
            description: 'Get image from google', 
            usage: 'image #{keyword}',
            aliases: ['img', 'photo', 'picture', '그림', '사진'],
            cooltime: 2000,
            isOwnerOnly: false
        });
    }

    async run(bot, message, args) {
        if (args.length < 1) {
            message.reply(bot.lang.lackOfArguments);
    
            return;
        }
    
        let q = args.join(' ');
        let url = `https://www.google.me/search?q=${encodeURI(q)}&hl=ko&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiEi8OL_eXgAhWUOnAKHbbZDWoQ_AUIDigB&biw=1313&bih=637`;
    
        request({
            headers: {
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36'
            },
            uri: url
        }, (err, res, body) => {
            let images = body.match(/(?<="ou":").+?(?=")/g) || [];
    
            if (images.length < 1) {
                message.reply(bot.lang.imageNotFound.random());
    
                return;
            }
    
            let embed = new discord.RichEmbed()
                .setColor('#ff9900')
                .setTitle(`:frame_photo: **${q}**`)
                .setImage(images.random());
    
            message.channel.send(embed);
        });
    }
}

module.exports = Image;