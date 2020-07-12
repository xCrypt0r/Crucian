const Event = require('../structures/Event.js');
const config = require('../assets/js/config.js');

module.exports = class extends Event {
    constructor(...args) {
        super(...args);
    }

    async run() {
        this.logger.log(`Logged in as ${this.user.tag}`);
        this.guilds.cache.forEach(guild => {
            this.config.ensure(guild.id, config.guild);

            guild.members.cache.forEach(member => {
                if (!member.user.bot) {
                    this.info.ensure(member.fullId, config.member(member));
                }
            });
        });
    }
};
