const Command = require('../../structures/Command.js');
const discord = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

class Botinfo extends Command {
    constructor(file) {
        super(file);
    }

    async run(message) {
        let { botInformation: info } = bot.lang;
        let embed = new discord.MessageEmbed()
            .setColor(bot.const.BOT_EMBED_COLOR)
            .setThumbnail(bot.user.displayAvatarURL())
            .addFields(
                {
                    name: info.botName.name,
                    value: bot.user.tag,
                    inline: true
                },
                {
                    name: info.uptime.name,
                    value: moment.duration(bot.uptime).format(bot.const.BOT_UPTIME_FORMAT),
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
                    value: info.discordVersion.value.format(discord.version),
                    inline: true
                }
            );

        message.channel.send(embed);
    }
}

module.exports = Botinfo;
