const { Structures } = require('discord.js');

module.exports = Structures.extend('Message', Message => class extends Message {
    constructor(...args) {
        super(...args);

        this.collectors = [];

        if (this.hasEmbeds && this.author.id === bot.user.id) {
            this.addCloseEmoji();
        }
    }

    get hasEmbeds() {
        return this.embeds.length > 0;
    }

    addCloseEmoji() {
        let closeEmoji = '❌',
            close = this.createReactionCollector(closeEmoji, { time: 100000 });

        this.react(closeEmoji);

        close.on('collect', (reaction, user) => {
            if (!user.bot) {
                this.collectors.forEach(collector => collector.stop());
                this.delete();
            }
        });
    }

    createReactionCollector(emoji, options = {}) {
        let filter = reaction => reaction.emoji.name === emoji,
            collector = super.createReactionCollector(filter, options);

        return collector;
    }
});
