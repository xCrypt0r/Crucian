const Event = require('../interfaces/Event.js');

module.exports = class extends Event {
    constructor(file) {
        super(file);
    }

    async run(message) {
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
    }
};
