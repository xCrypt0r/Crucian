const Command = require('../../structures/Command.js');

class Select extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message, args) {
        message.reply(bot.lang.chooseEnd.random().format(args.random()));
    }
}

module.exports = Select;
