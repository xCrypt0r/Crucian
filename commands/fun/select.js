const Command = require('../../interfaces/Command.js');

class Select extends Command {
    constructor(file) {
        super(file);
    }

    async run(message, args) {
        if (args.length < 1) {
            message.reply(bot.lang.lackOfArguments);
    
            return;
        }
    
        message.reply(bot.lang.chooseEnd.random().format(args.random()));
    }
}

module.exports = Select;
