const path = require('path');

class Event {
    constructor(file) {
        this.file = file;
        this.name = path.parse(file).name;
    }
}

module.exports = Event;
