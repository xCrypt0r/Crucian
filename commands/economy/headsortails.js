const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');

class HeadsOrTails extends Command {
    static selectOptions = [...Object.values(bot.consts.HEADS_OR_TAILS_SELECT_OPTIONS)].flat();
    static continueOptions = [...Object.values(bot.consts.YES_OR_NO_OPTIONS)].flat();

    constructor(...args) {
        super(...args);
    }

    initialize() {
        this.times = 0;
        this.form = bot.lang.headsOrTails;
    }

    async run(message) {
        this.initialize();
        this.playGame(message);
    }

    async playGame(message) {
        let filter = ({ author, content }) =>
            message.author === author && HeadsOrTails.selectOptions.includes(content);

        await message.channel.send(this.form.chooseHeadsOrTails);

        message.channel
            .awaitMessages(filter, bot.consts.OPTION.HEADS_OR_TAILS)
            .then(async collected => {
                let headOrTail = this.flipCoin(),
                    { author, content } = collected.first();

                if (headOrTail.includes(content)) {
                    this.times++;

                    await message.channel.send(this.form.hasWon.format(author.tag, this.times));
                    await message.channel.send(this.form.chooseContinue.format(this.calculateWinnings()));
                    this.continueGame(message);
                } else {
                    message.channel.send(this.form.hasLost);
                }
            })
            .catch(e => {
                this.handleTimeout(message);
            });
    }

    async continueGame(message) {
        let filterContinue = ({ author, content }) =>
            message.author === author && HeadsOrTails.continueOptions.includes(content);

        message.channel
            .awaitMessages(filterContinue, bot.consts.OPTION.HEADS_OR_TAILS)
            .then(collected => {
                let { content } = collected.first();

                if (bot.consts.YES_OR_NO_OPTIONS.YES.includes(content)) {
                    this.playGame(message);
                } else {
                    this.stopGame(message);
                }
            })
            .catch(e => {
                this.handleTimeout(message);
            });
    }

    async stopGame(message) {
        let winnings = this.calculateWinnings();

        message.member.giveMoney(winnings);

        let embed = new MessageEmbed()
            .setTitle(this.form.title)
            .setColor(bot.consts.COLOR.HEADS_OR_TAILS)
            .setThumbnail(message.author.displayAvatarURL())
            .setTimestamp()
            .addFields(
                {
                    name: this.form.winCount.name,
                    value: this.times,
                    inline: true
                },
                {
                    name: this.form.collected.name,
                    value: winnings,
                    inline: true
                },
                {
                    name: this.form.balance.name,
                    value: (await message.member.info).money,
                    inline: true
                }
            );

        message.channel.send(embed);
    }

    flipCoin() {
        return bot.consts.HEADS_OR_TAILS_SELECT_OPTIONS[['HEAD', 'TAIL'].random()];
    }

    calculateWinnings() {
        return bot.consts.HEADS_OR_TAILS_DEFAULT_INCOME * Math.pow(2, this.times - 1);
    }

    handleTimeout(message) {
        message.channel.send(this.form.timeout);
    }
}

module.exports = HeadsOrTails;
