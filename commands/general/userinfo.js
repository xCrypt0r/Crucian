const Command = require('../../interfaces/Command.js');
const discord = require('discord.js');
const moment = require('moment');

class Userinfo extends Command {
    constructor(file) {
        super(file, {
            name: 'userinfo',
            description: 'Show user\'s information',
            usage: 'userinfo #{mention}',
            aliases: ['유저정보', '정보'],
            isOwnerOnly: false
        });
    }

    async run(bot, message) {
        let user = message.mentions.users.first() || message.author;

        if (!user) {
            message.reply(bot.lang.cantFindUser);

            return;
        }

        let member = message.guild.member(user);
        let embed = new discord.RichEmbed()
            .setTitle('User Information')
            .setColor(0xedd81c)
            .setThumbnail(user.displayAvatarURL)
            .addField('Name', `${user.tag}`, true)
            .addField('Created At', moment.utc(user.createdAt).format('YYYY-MM-DD'), true)
            .addField('Joined At', moment.utc(member.joinedAt).format('YYYY-MM-DD'), true)
            .addField('Status', member.presence.status, true)
            .addField('Roles', member.roles.map(role => role.name).join(', '));

        message.channel.send(embed);
    }
}

module.exports = Userinfo;
