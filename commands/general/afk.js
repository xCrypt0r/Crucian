const Command = require('../../structures/Command.js');

/**
 * Class to set member as AFK
 *
 * @class Afk
 * @extends {Command}
 */
class Afk extends Command {
    /**
     * Creates an instance of Afk
     *
     * @param {string} file
     */
    constructor(file) {
        super(file);
    }

    /**
     * Set member as AFK
     *
     * @param {Message} message
     * @param {string[]} args
     */
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
