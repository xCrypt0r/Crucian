const { Structures } = require('discord.js');
const MemberModel = require('../models/Member.js');

module.exports = Structures.extend('GuildMember', GuildMember => class extends GuildMember {
    get fullId() {
        return `${this.guild.id}-${this.id}`;
    }

    get info() {
        return MemberModel
            .findOne({ fullId: this.fullId });
    }

    async initialize() {
        if (!await MemberModel.findOne({ fullId: this.fullId }) && !this.user.bot) {
            let newMember = new MemberModel({ fullId: this.fullId, guildId: this.guild.id });

            await newMember.save();
        }
    }

    async giveMoney(amount) {
        return await MemberModel.findOneAndUpdate(
            { fullId: this.fullId },
            { $inc: { money: amount } },
            { new: true }
        );
    }

    async takeMoney(amount) {
        return await MemberModel.findOneAndUpdate(
            { fullId: this.fullId },
            { $inc: { money: -amount } },
            { new: true }
        );
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
