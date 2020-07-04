const Event = require('../structures/Event.js');

module.exports = class extends Event {
    constructor(file) {
        super(file);
    }

    async run(oldMessage, newMessage) {
        this.emit('message', newMessage);
    }
};
