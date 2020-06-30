const { Structures } = require('discord.js');

module.exports = Structures.extend('Message', Message => class extends Message {
    constructor(...args) {
        super(...args);
    }

    createReactionCollector(emoji, options = {}) {
        let filter = reaction => reaction.emoji.name === emoji,
            collector = super.createReactionCollector(filter, options);

        return collector;
    }
});
