const { Structures } = require('discord.js');

module.exports = Structures.extend('Guild', Guild => class extends Guild {
    constructor(...args) {
        super(...args);
    }

    async createRole(name, options = {}) {
        if (!name) {
            bot.logger.error('No role name was given');

            return;
        }

        options.name = name;
        options.color = options.color || 0x000000;

        return this.roles
            .create({ data: options });
    }
});
