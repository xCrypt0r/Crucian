const Command = require('../../structures/Command.js');
const MemberModel = require('../../models/Member.js');
const { MessageEmbed } = require('discord.js');
const ms = require('pretty-ms');

class Daily extends Command {
    static timeout = bot.consts.DAY_TO_MILLISECOND;
    static amount = 500;

    constructor(...args) {
        super(...args);
    }

    async run(message) {
        let member = message.member,
            { money, daily } = await member.info;

        if (Daily.timeout > Date.now() - daily) {
            let time = ms(Daily.timeout - (Date.now() - daily), {
                secondsDecimalDigits: 0
            });

            message.reply(bot.lang.alreadyGotDaily.format(time));
        } else {
            let { dailyRewards: format } = bot.lang;
            let embed = new MessageEmbed()
                .setTitle(format.title)
                .setThumbnail(message.author.displayAvatarURL())
                .setColor(bot.consts.COLOR.DAILY_EMBED)
                .addFields(
                    {
                        name: format.collected.name,
                        value: Daily.amount,
                        inline: true
                    },
                    {
                        name: format.balance.name,
                        value: money + Daily.amount,
                        inline: true
                    }
                );

            await MemberModel.updateOne(
                { fullId: member.fullId },
                {
                    $set: { daily: new Date() },
                    $inc: { money: Daily.amount }
                }
            );
            message.channel.send(embed);
        }
    }
}

module.exports = Daily;
