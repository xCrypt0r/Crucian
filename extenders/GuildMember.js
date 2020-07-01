const { Structures } = require('discord.js');

module.exports = Structures.extend('GuildMember', GuildMember => class extends GuildMember {
    constructor(...args) {
        super(...args);
    }

    async addRole(role) {
        await this.roles
            .add(role)
            .catch(bot.logger.error);

        return this;
    }

    async removeRole(role) {
        await this.roles
            .remove(role)
            .catch(bot.logger.error);

        return this;
    }
});
