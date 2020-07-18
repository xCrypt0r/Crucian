const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');

class AddMoney extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message, args) {
        let amount = Number(args.pop());

        if (!Number.isInteger(amount) || amount <= 0) {
            message.reply(bot.lang.invalidArguments);

            return;
        }

        let member = message.mentions.members.first() || message.member;

        if (!member) {
            message.reply(bot.lang.cantFindUser);

            return;
        }

        let doc  = await member.giveMoney(amount),
            { addMoney: format } = bot.lang,
            embed = new MessageEmbed()
                .setTitle(format.title)
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setThumbnail(member.user.displayAvatarURL())
                .setColor(bot.consts.COLOR.ADDMONEY_EMBED)
                .addFields(
                    {
                        name: format.amount.name,
                        value: amount,
                        inline: true
                    },
                    {
                        name: format.balance.name,
                        value: doc.money,
                        inline: true
                    }
                );

        message.channel.send(embed);
    }
}

module.exports = AddMoney;
