const { Client, Collection } = require('discord.js');
const Logger = require('../interfaces/Logger.js');
const glob = require('glob');

class Crucian extends Client {
    constructor(options = {}) {
        super(options);

        this.logger = new Logger(this);
        this.config = require('../assets/json/config.json');
        this.prefix = this.config.PREFIX;
        this.lang = require('../assets/json/lang.json');
        this.commands = new Collection();
        this.tools = require('../lib/utils.js');
        this.active = new Map();
        this.cooldown = new Set();

        glob('*.js', { cwd: 'events' }, (err, events) => {
            if (err) {
                this.logger.error(err);

                return;
            }

            if (events.length <= 0) {
                this.logger.error('Cannot find event handler.');

                return;
            }

            events.forEach(file => {
                let event = new (require(`../events/${file}`))(file);

                this.on(event.name, event.run.bind(this));
            });
        });
    }

    async login(token) {
        await Promise.all([this.loadCommands(), super.login(token)]);
    }

    async loadCommands() {
        glob('**/*.js', { cwd: 'commands' }, (err, handlers) => {
            if (err) {
                this.logger.error(err);

                return;
            }

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
        });
    }

    async unloadCommands() {
        glob('**/*.js', { cwd: 'commands' }, (err, handlers) => {
            if (err) {
                this.logger.error(err);

                return;
            }

            handlers.forEach(file => {
                delete require.cache[require.resolve(`../commands/${file}`)];
            });
        });
    }
}

module.exports = Crucian;
