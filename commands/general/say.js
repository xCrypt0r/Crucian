const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');

class Say extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message, args) {
        message.delete();

        if (message.mentions.channels.size > 0) {
            args.shift();

            message.channel = message.mentions.channels.first();
        }

        let embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription(args.join(' '));

        await message.channel.send(embed);
    }
}

module.exports = Say;