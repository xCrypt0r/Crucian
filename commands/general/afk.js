const Command = require('../../structures/Command.js');

class Afk extends Command {
    constructor(file) {
        super(file);
    }

    async run(message, args) {
        let id = message.author.id,
            reason = args.join(' ').trim();

        bot.afk.has(id) && !reason ? (
            bot.afk.delete(id),
            message.reply(bot.lang.afkUnset)
        ) : (
            bot.afk.set(message.author.id, reason),
            message.reply(bot.lang.afkSet.format(reason))
        );

        return;
    }
}

module.exports = Afk;
