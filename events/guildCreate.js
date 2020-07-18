const Event = require('../structures/Event.js');

module.exports = class extends Event {
    constructor(...args) {
        super(...args);
    }

    async run(guild) {
        guild.initialize();
    }
};
