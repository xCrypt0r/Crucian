const { Client, Collection } = require('discord.js');
const Logger = require('../interfaces/Logger.js');
const glob = require('glob');

class Crucian extends Client {
    constructor(options = {}) {
        super(options);

        this.logger = new Logger(this);
        this.config = require('../assets/json/config.json');
        this.lang = require('../assets/json/lang.json');
        this.commands = new Collection();
        this.tools = require('../lib/utils.js');
        this.active = new Map();
        this.cooldown = new Set();

        this.on('ready', async () => {
            this.logger.log(`Logged in as ${this.user.tag}`);
        });
        this.on('message', async message => {
            if (this.config.IGNORE_BOT_MESSAGES && message.author.bot) {
                return;
            }

            let prefix =  this.config.PREFIX;

            if (message.content.startsWith(prefix)) {
                let messageArray = message.content.trim().split(/\s+/),
                    cmd = messageArray[0].slice(prefix.length).toLowerCase(),
                    args = messageArray.slice(1),
                    handler = this.commands.get(cmd),
                    isOwner = message.author.id === process.env.OWNER_ID;

                if (handler) {
                    if (handler.isOwnerOnly && !isOwner) {
                        message.reply(this.lang.ownerOnlyCommand.format(handler.name.toUpperCase()));

                        return;
                    }

                    if (this.cooldown.has(handler)) {
                        message.reply(this.lang.commandInCooldown.format(handler.name.toUpperCase()));

                        return;
                    }

                    handler.run(this, message, args);

                    if (this.config.USE_DATABASE) {
                        handler.log(message);
                    }

                    let cooltime = handler.cooltime;

                    if (cooltime) {
                        this.cooldown.add(handler);

                        setTimeout(() => {
                            this.cooldown.delete(handler);
                        }, cooltime);
                    }
                }
            }
        });
    }

    async login(token) {
        await this.loadCommands();
        await super.login(token);
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