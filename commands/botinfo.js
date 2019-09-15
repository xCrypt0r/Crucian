const discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    let embed = new discord.RichEmbed()
        .setDescription('Bot Information')
        .setColor('#15f153')
        .setThumbnail(bot.user.displayAvatarURL)
        .addField('Name', `${bot.user.username}#${bot.user.discriminator}`)
        .addField('Created at', bot.user.createdAt);

    message.channel.send(embed);
};

module.exports.config = {
    name: 'botinfo',
    description: 'Display bot information',
    alias: ['봇정보', '정보'],
    isOwnerOnly: false
};
