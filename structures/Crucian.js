const { Client, Collection } = require('discord.js');
const Enmap = require('enmap');
const Logger = require('../structures/Logger.js');
const glob = require('fast-glob');

class Crucian extends Client {
    constructor(options = {}) {
        super(options);

        this.consts     = require('../assets/json/consts.json');
        this.lang       = require('../assets/json/lang_ko.json');
        this.tools      = require('../lib/utils.js');
        this.logger     = new Logger(this);
        this.commands   = new Collection();
        this.cooldown   = new Object();
        this.afk        = new Map();
        this.active     = new Map();
        
        Object.assign(this, Enmap.multi(['config', 'usage', 'info'], { ensureProps: true }));
    }

    async login(token) {
        await Promise.all([
            this.loadEvents(),
            this.loadCommands(),
            super.login(token)
        ]);
    }

    async loadCommands() {
        let handlers = await glob('**/*.js', { cwd: 'commands' });
        
        if (handlers.length <= 0) {
            this.logger.error('Cannot find command handler.');

            return;
        }
        
        handlers.forEach(file => {
            let handler = new (require(`../commands/${file}`))(file);

            this.commands.set(handler.name, handler);

            if (handler.aliases) {
                handler.aliases.forEach(alias => {
                    if (this.commands.has(alias)) {
                        this.logger.error(`Bot already has ${alias} handler. It'll override existing handler.`);
                    }

                    this.commands.set(alias, handler);
                });
            }

            this.logger.log(`Handler: ${file} loaded.`);
        });
    }
    
    async loadEvents() {
        let events = await glob('*.js', { cwd: 'events' });

        if (events.length <= 0) {
            this.logger.error('Cannot find event handler.');

            return;
        }

        events.forEach(file => {
            let event = new (require(`../events/${file}`))(file);

            this.on(event.name, event.run.bind(this));
            this.logger.log(`Event: ${file} loaded.`);
        });
    }

    async unloadCommands() {
        this.commands.forEach(command => {
            delete require.cache[require.resolve(`../commands/${command.category}/${command.name}`)];
        });
        this.commands.clear();
    }
    
    async unloadEvents() {
        this
            .eventNames()
            .forEach(eventName => {
                this.removeAllListeners(eventName);
            });
    }
}

module.exports = Crucian;
