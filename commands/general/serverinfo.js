const Command = require('../../interfaces/Command.js');
const discord = require('discord.js');
const moment = require('moment');

class Serverinfo extends Command {
    constructor(file) {
        super(file, {
            name: 'serverinfo',
            description: 'Show server\'s information',
            usage: 'serverinfo',
            aliases: ['서버정보'],
            isOwnerOnly: false
        });
    }

    async run(bot, message) {
        let guild = message.guild;
        let embed = new discord.RichEmbed()
            .setTitle('Server Information')
            .setColor(0x0244f7)
            .setThumbnail(guild.iconURL)
            .addField('Name', `${guild.name}`, true)
            .addField('Created At', moment.utc(guild.createdAt).format('YYYY-MM-DD'), true)
            .addField('Master', guild.owner.user.tag, true)
            .addField('Region', guild.region, true)
            .addField('Members', guild.memberCount, true)
            .addField('Bots', guild.members.filter(member => member.user.bot).size, true)
            .addField('TextChannels', guild.channels.filter(channel => channel.type === 'text').size, true)
            .addField('VoiceChannels', guild.channels.filter(channel => channel.type === 'voice').size, true)
            .addField('Roles', guild.roles
                .map(role => role.name)
                .filter(roleName => !roleName.startsWith('@'))
                .join(', ')
            );

        message.channel.send(embed);
    }
}

module.exports = Serverinfo;
