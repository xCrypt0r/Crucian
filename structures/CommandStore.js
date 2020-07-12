const Store = require('./Store.js');
const { Collection } = require('discord.js');
const path = require('path');

class CommandStore extends Store {
    constructor(client) {
        super(client, 'commands');

        this.aliases = new Collection();
    }

    get(name) {
        return super.get(name) || this.aliases.get(name);
    }

    has(name) {
        return super.has(name) || this.aliases.has(name);
    }

    set(command) {
        super.set(command);

        if (command.aliases.length > 0) {
            for (let i = 0; i < command.aliases.length; i++) {
                this.aliases.set(command.aliases[i], command);
            }
        }

        return command;
    }

    delete(command) {
        delete require.cache[path.join(this.dir, command.file)];
        super.delete(command.name);
    }

    clear() {
        for (let command of this.values()) {
            this.delete(command);
        }

        super.clear();
        this.aliases.clear();
    }
}

module.exports = CommandStore;