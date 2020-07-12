const Event = require('../structures/Event.js');

module.exports = class extends Event {
    constructor(...args) {
        super(...args);
    }

    async run(oldMessage, newMessage) {
        this.emit('message', newMessage);
    }
};
