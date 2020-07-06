const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');
const ms = require('pretty-ms');

class Daily extends Command {
    static timeout = bot.consts.DAY_TO_MILLISECOND;
    static amount = 500;
    
    constructor(file) {
        super(file);
    }

    async run(message) {
        let member = message.member,
            { money, daily } = member.info;
        
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

            bot.info.set(member.fullId, {
                money: money + Daily.amount,
                daily: Date.now()
            });
            message.channel.send(embed);
        }
    }
}

module.exports = Daily;
