const Store = require('./Store.js');
const { Collection } = require('discord.js');

class EventStore extends Store {
    constructor(client) {
        super(client, 'events');
    }

    set(event) {
        super.set(event);
        this.client.on(event.name, event.run.bind(this.client));

        return event;
    }

    delete(name) {
        this.client.removeAllListeners(name);

        return super.delete(name);
    }

    clear() {
        for (let event of this.keys()) {
            this.delete(event);
        }
    }
}

module.exports = EventStore;