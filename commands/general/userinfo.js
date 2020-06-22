const Command = require('../../structures/Command.js');
const discord = require('discord.js');
const moment = require('moment');

class Userinfo extends Command {
    constructor(file) {
        super(file);
    }

    async run(message) {
        let user = message.mentions.users.first() || message.author;

        if (!user) {
            message.reply(bot.lang.cantFindUser);

            return;
        }

        let { userInformation: info } = bot.lang,
            member = message.guild.member(user);
        let embed = new discord.MessageEmbed()
            .setColor(0xedd81c)
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                {
                    name: info.userName.name,
                    value: user.tag,
                    inline: true
                },
                {
                    name: info.createdAt.name,
                    value: moment.utc(user.createdAt).format(bot.const.USER_CREATEDAT_FORMAT),
                    inline: true
                },
                {
                    name: info.joinedAt.name,
                    value: moment.utc(member.joinedAt).format(bot.const.USER_JOINEDAT_FORMAT),
                    inline: true
                },
                {
                    name: info.status.name,
                    value: member.presence.status,
                    inline: true
                },
                {
                    name: info.roles.name,
                    value: member.roles.cache.map(role => role.name)
                        .filter(roleName => !roleName.startsWith('@'))
                        .join(', ')
                }
            );

        message.channel.send(embed);
    }
}

module.exports = Userinfo;
