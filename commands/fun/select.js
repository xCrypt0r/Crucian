const Command = require('../../structures/Command.js');

/**
 * Class to randomly select one of several items
 *
 * @class Select
 * @extends {Command}
 */
class Select extends Command {
    /**
     * Creates an instance of Select
     *
     * @param {string} file
     */
    constructor(file) {
        super(file);
    }

    /**
     * Randomly select one item
     *
     * @param {Message} message
     * @param {string[]} args
     */
    async run(message, args) {
        message.reply(bot.lang.chooseEnd.random().format(args.random()));
    }
}

module.exports = Select;
