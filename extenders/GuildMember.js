const { Structures } = require('discord.js');

module.exports = Structures.extend('GuildMember', GuildMember => class extends GuildMember {
    get fullId() {
        return `${this.guild.id}-${this.id}`;
    }
    
    get info() {
        return this.client.info.get(this.fullId);
    }
    
    giveMoney(money) {
        return this.client.info.math(this.fullId, 'add', money, 'money');
    }
    
    takeMoney(money) {
        return this.client.info.math(this.fullId, 'sub', money, 'money');
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
