const Command = require('../../structures/Command.js');
const { MessageEmbed, version } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

class Botinfo extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message) {
        let { botInformation: info } = bot.lang;
        let embed = new MessageEmbed()
            .setColor(bot.consts.COLOR.BOT_EMBED)
            .setThumbnail(bot.user.displayAvatarURL())
            .addFields(
                {
                    name: info.botName.name,
                    value: bot.user.tag,
                    inline: true
                },
                {
                    name: info.uptime.name,
                    value: moment.duration(bot.uptime).format(bot.consts.FORMAT.BOT_UPTIME),
                    inline: true
                },
                {
                    name: info.users.name,
                    value: bot.users.cache.size.toLocaleString(),
                    inline: true
                },
                {
                    name: info.servers.name,
                    value: bot.guilds.cache.size.toLocaleString(),
                    inline: true
                },
                {
                    name: info.channels.name,
                    value: bot.channels.cache.size.toLocaleString(),
                    inline: true
                },
                {
                    name: info.discordVersion.name,
                    value: info.discordVersion.value.format(version),
                    inline: true
                }
            );

        message.channel.send(embed);
    }
}

module.exports = Botinfo;
