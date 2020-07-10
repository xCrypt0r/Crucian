const Event = require('../structures/Event.js');

module.exports = class extends Event {
    constructor(file) {
        super(file);
    }

    async run(message) {
        let { guild, member, content } = message;
        
        if (this.config.get(guild.id, 'ignoreBotMessages') && member.user.bot) {
            return;
        }

        let { prefix } = this.config.get(guild.id);

        if (content.startsWith(prefix)) {
            let messageArray = content.trim().split(/\s+/),
                cmd = messageArray[0].slice(prefix.length).toLowerCase(),
                args = messageArray.slice(1),
                handler = this.commands.get(cmd),
                isOwner = member.id === process.env.OWNER_ID;

            if (handler) {
                let { name: command, cooldown, isOwnerOnly, minArgc } = handler;
                
                if (isOwnerOnly && !isOwner) {
                    message.reply(this.lang.ownerOnlyCommand.format(command.toUpperCase()));

                    return;
                }

                if (Object.prototype.hasOwnProperty.call(this.cooldown, command) && this.cooldown[command].has(member.fullId)) {
                    message.reply(this.lang.commandInCooldown.format(command.toUpperCase()));

                    return;
                }

                if (args.length < minArgc) {
                    message.reply(this.lang.lackOfArguments.format(minArgc));
    
                    return;
                }

                handler.run(message, args);
                handler.log(message);

                if (cooldown) {
                    this.cooldown[command] = this.cooldown[command] || new Set();
                    
                    this.cooldown[command].add(member.fullId);
                    this.setTimeout(() => {
                        this.cooldown[command].delete(member.fullId);
                    }, cooldown);
                }
            }
        } else {
            let mentions = message.mentions;

            for (let [id, reason] of this.afk) {
                let member = guild.members.cache.get(id);
                
                if (mentions.roles.size === 0 && mentions.has(member)) {
                    message.reply(this.lang.userIsInAfk.format(member.user.tag, reason));
                }
            }
        }
    }
};
