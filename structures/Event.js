const path = require('path');

class Event {
    constructor(client, file) {
        this.client = client;
        this.file = file;
        this.name = path.parse(file).name;
        this.store = client.events;
    }

    reload() {
        return this.store.load(this.file);
    }
}

module.exports = Event;
