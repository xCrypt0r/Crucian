const Event = require('../structures/Event.js');

module.exports = class extends Event {
    constructor(file) {
        super(file);
    }

    async run(message) {
        let guild = message.guild;
        
        if (this.config.get(guild.id, 'IGNORE_BOT_MESSAGES') && message.author.bot) {
            return;
        }

        let prefix = this.config.get(guild.id, 'PREFIX');

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

                if (args.length < handler.minArgc) {
                    message.reply(this.lang.lackOfArguments.format(handler.minArgc));
    
                    return;
                }

                handler.run(message, args);
                handler.log(message);

                let cooldown = handler.cooldown;

                if (cooldown) {
                    this.cooldown.add(handler);
                    this.setTimeout(() => {
                        this.cooldown.delete(handler);
                    }, cooldown);
                }
            }
        } else {
            let mentions = message.mentions;

            for (let [id, reason] of bot.afk) {
                let member = message.guild.members.cache.get(id);
                
                if (mentions.roles.size === 0 && mentions.has(member)) {
                    message.reply(bot.lang.userIsInAfk.format(member.user.tag, reason));
                }
            }
        }
    }
};
