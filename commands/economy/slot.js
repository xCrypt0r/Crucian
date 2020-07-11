const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');
const { SlotMachine } = require('slot-machine');
const symbols = require('../../assets/js/slot-symbol.js');
const machine = new SlotMachine(bot.consts.SLOTMACHINE_SIZE, Object.values(symbols));

/**
 * Class to implement slot game
 *
 * @class Slot
 * @extends {Command}
 */
class Slot extends Command {
    /**
     * Creates an instance of Slot
     *
     * @param {string} file
     */
    constructor(file) {
        super(file);
    }

    /**
     * Play slot game
     *
     * @param {Message} message
     * @param {string[]} args
     */
    async run(message, args) {
        let bet = Number(args[0]),
            { money } = message.member.info;

        if (!Number.isInteger(bet) || bet <= 0) {
            message.reply(bot.lang.invalidArguments);

            return;
        }

        if (money < bet) {
            message.reply(bot.lang.notEnoughMoney.format(money));

            return;
        }

        let member = message.member,
            times = 3 * bet,
            results = machine.play(),
            winnings = Math.ceil(times * results.totalPoints),
            hasWon = results.winCount > 0,
            { slotMachine: slot } = bot.lang,
            embed = new MessageEmbed()
                .setTitle(slot.title)
                .setColor(bot.consts.COLOR.SLOT_EMBED)
                .setThumbnail(message.author.displayAvatarURL())
                .setDescription(results.visualize(false))
                .setTimestamp();

        hasWon > 0 ? (
            member.giveMoney(winnings),
            embed.description += slot.hasWon.format(member.displayName, winnings)
        ) : (
            member.takeMoney(bet),
            embed.description += slot.hasLost.format(member.displayName, bet)
        );

        embed.addFields(
            {
                name: slot.bet.name,
                value: bet,
                inline: true
            },
            {
                name: slot.result.name,
                value: hasWon ? winnings : -bet,
                inline: true
            },
            {
                name: slot.balance.name,
                value: member.info.money,
                inline: true
            }
        );

        message.channel.send(embed);
    }
}

module.exports = Slot;
