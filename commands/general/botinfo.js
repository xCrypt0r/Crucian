const Command = require('../../interfaces/Command.js');
const discord = require('discord.js');

class Botinfo extends Command {
    constructor(file) {
        super(file, {
            name: 'botinfo',
            description: 'Display bot information',
            usage: 'botinfo',
            aliases: ['봇정보', '정보'],
            isOwnerOnly: false
        });
    }

    async run(bot, message) {
        let embed = new discord.RichEmbed()
            .setDescription('Bot Information')
            .setColor('#15f153')
            .setThumbnail(bot.user.displayAvatarURL)
            .addField('Name', `${bot.user.username}#${bot.user.discriminator}`)
            .addField('Created at', bot.user.createdAt);

        message.channel.send(embed);
    }
}

module.exports = Botinfo;
