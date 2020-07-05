const { Structures } = require('discord.js');

module.exports = Structures.extend('GuildMember', GuildMember => class extends GuildMember {
    get fullId() {
        return `${this.guild.id}-${this.id}`;
    }
    
    get economy() {
        return this.client.economy.get(this.fullId) || { money: 0, daily: Date.now() - bot.consts.DAY_TO_MILLISECOND };
    }

    get warnings() {
        return this.client.warnings.get(this.fullId) || 0;
    }
    
    get reminders() {
        return this.client.reminders
            .findAll('id', this.id) || [];
    }
    
    giveMoney(money) {
        return this.client.economy.math(this.fullId, 'add', money, 'money');
    }
    
    takeMoney(money) {
        return this.client.economy.math(this.fullId, 'sub', money, 'money');
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
