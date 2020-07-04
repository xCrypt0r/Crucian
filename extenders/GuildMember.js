const { Structures } = require('discord.js');

module.exports = Structures.extend('GuildMember', GuildMember => class extends GuildMember {
    get fullId() {
        return `${this.guild.id}-${this.id}`;
    }
    
    get reminders() {
        return this.client.reminders
            .findAll('id', this.id) || [];
    }

    async addRole(role) {
        await this.roles
            .add(role)
            .catch(bot.logger.error);

        return this;
    }

    async removeRole(roleName) {
        let role = this.guild.roles.cache
            .find(role => role.name === roleName);

        await this.roles
            .remove(role)
            .catch(bot.logger.error);

        return this;
    }
});
