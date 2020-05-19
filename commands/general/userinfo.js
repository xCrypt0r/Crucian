const Command = require('../../interfaces/Command.js');
const discord = require('discord.js');
const moment = require('moment');

class Userinfo extends Command {
    constructor(file) {
        super(file);
    }

    async run(bot, message) {
        let user = message.mentions.users.first() || message.author;

        if (!user) {
            message.reply(bot.lang.cantFindUser);

            return;
        }

        let member = message.guild.member(user);
        let embed = new discord.MessageEmbed()
            .setTitle('User Information')
            .setColor(0xedd81c)
            .setThumbnail(user.displayAvatarURL())
            .addField('Name', `${user.tag}`, true)
            .addField('Created At', moment.utc(user.createdAt).format('YYYY-MM-DD'), true)
            .addField('Joined At', moment.utc(member.joinedAt).format('YYYY-MM-DD'), true)
            .addField('Status', member.presence.status, true)
            .addField('Roles', member.roles.cache.map(role => role.name)
                .filter(roleName => !roleName.startsWith('@'))
                .join(', ')
            );

        message.channel.send(embed);
    }
}

module.exports = Userinfo;
