const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

/**
 * Class to show user's information
 *
 * @class UserInfo
 * @extends {Command}
 */
class UserInfo extends Command {
    /**
     * Creates an instance of UserInfo
     *
     * @param {string} file
     */
    constructor(file) {
        super(file);
    }

    /**
     * Show user's information
     *
     * @param {Message} message
     */
    async run(message) {
        let user = message.mentions.users.first() || message.author;

        if (!user) {
            message.reply(bot.lang.cantFindUser);

            return;
        }

        let { userInformation: info } = bot.lang,
            member = message.guild.member(user);
        let embed = new MessageEmbed()
            .setColor(bot.consts.COLOR.USER_EMBED)
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                {
                    name: info.userName.name,
                    value: user.tag,
                    inline: true
                },
                {
                    name: info.createdAt.name,
                    value: moment.utc(user.createdAt).format(bot.consts.FORMAT.USER_CREATEDAT),
                    inline: true
                },
                {
                    name: info.joinedAt.name,
                    value: moment.utc(member.joinedAt).format(bot.consts.FORMAT.USER_JOINEDAT),
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

module.exports = UserInfo;
