const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');

class Avatar extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message) {
        let user = message.mentions.users.first() || message.author;

        if (!user) {
            message.reply(bot.lang.cantFindUser);

            return;
        }

        let embed = new MessageEmbed()
            .setTitle(user.tag)
            .setColor(bot.consts.COLOR.USER_EMBED)
            .setImage(user.displayAvatarURL({
                format: 'png',
                size: 512,
                dynamic: true
            }));

        message.channel.send(embed);
    }
}

module.exports = Avatar;