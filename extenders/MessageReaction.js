const { Structures } = require('discord.js');

module.exports = Structures.extend('MessageReaction', MessageReaction => class extends MessageReaction {
    constructor(...args) {
        super(...args);
    }

    async revert() {
        let users = this.users.cache
            .filter(user => !user.bot);

        users.forEach(user => this.users.remove(user));

        return this;
    }
});
