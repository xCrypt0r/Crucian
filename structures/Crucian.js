const { Client } = require('discord.js');
const Logger = require('../structures/Logger.js');
const CommandStore = require('../structures/CommandStore.js');
const EventStore = require('../structures/EventStore.js');

class Crucian extends Client {
    constructor(options = {}) {
        super(options);

        this.dashboard  = require('../dashboard/app.js');
        this.config     = require('../assets/json/config.json');
        this.consts     = require('../assets/json/consts.json');
        this.lang       = require('../assets/json/lang_ko.json');
        this.tools      = require('../lib/utils.js');
        this.logger     = new Logger(this);
        this.commands   = new CommandStore(this);
        this.events     = new EventStore(this);
        this.cooldown   = new Object();
        this.afk        = new Map();
        this.active     = new Map();
    }

    async login(token) {
        await Promise.all([
            this.events.loadFiles(),
            this.commands.loadFiles(),
            super.login(token)
        ]);
    }
}

module.exports = Crucian;
