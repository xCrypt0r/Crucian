const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

class Serverinfo extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message) {
        let { serverInformation: info } = bot.lang,
            guild = message.guild;
        let embed = new MessageEmbed()
            .setColor(bot.consts.COLOR.SERVER_EMBED)
            .setThumbnail(guild.iconURL())
            .addFields(
                {
                    name: info.serverName.name,
                    value: guild.name,
                    inline: true
                },
                {
                    name: info.createdAt.name,
                    value: moment.utc(guild.createdAt).format(bot.consts.FORMAT.SERVER_CREATEDAT),
                    inline: true
                },
                {
                    name: info.master.name,
                    value: guild.owner.user.tag,
                    inline: true
                },
                {
                    name: info.region.name,
                    value: guild.region,
                    inline: true
                },
                {
                    name: info.members.name,
                    value: guild.memberCount,
                    inline: true
                },
                {
                    name: info.bots.name,
                    value: guild.members.cache.filter(member => member.user.bot).size,
                    inline: true
                },
                {
                    name: info.textChannels.name,
                    value: guild.channels.cache.filter(channel => channel.type === 'text').size,
                    inline: true
                },
                {
                    name: info.voiceChannels.name,
                    value: guild.channels.cache.filter(channel => channel.type === 'voice').size,
                    inline: true
                },
                {
                    name: info.roles.name,
                    value:  guild.roles.cache
                        .map(role => role.name)
                        .filter(roleName => !roleName.startsWith('@'))
                        .join(', ')
                }
            );

        message.channel.send(embed);
    }
}

module.exports = Serverinfo;
