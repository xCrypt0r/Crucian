const Command = require('../../structures/Command.js');

/**
 * Class to sanction Crucian
 *
 * @class Sanction
 * @extends {Command}
 */
class Sanction extends Command {
    /**
     * Creates an instance of Sanction
     *
     * @param {string} file
     */
    constructor(file) {
        super(file);
    }

    /**
     * Sanction Crucian
     *
     * @param {Message} message
     */
    async run(message) {
        let reaction = bot.lang.sanctionReaction.random();

        message.channel.send(reaction);
    }
}

module.exports = Sanction;
