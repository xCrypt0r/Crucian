const Event = require('../structures/Event.js');

module.exports = class extends Event {
    constructor(file) {
        super(file);
    }

    async run() {
        this.logger.log(`Logged in as ${this.user.tag}`);
        this.user.setActivity(this.lang.helpManual.activity.format(this.prefix));
    }
};
