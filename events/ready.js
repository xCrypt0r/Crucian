const Event = require('../structures/Event.js');
const config = require('../assets/json/config.json');
const userConfig = require('../assets/js/config-user.js');

module.exports = class extends Event {
    constructor(file) {
        super(file);
    }

    async run() {
        this.logger.log(`Logged in as ${this.user.tag}`);

        this.guilds.cache.forEach(guild => {
            this.config.ensure(guild.id, config);

            guild.members.cache.forEach(member => {
                this.info.ensure(member.fullId, userConfig);
            });
        });
    }
};
