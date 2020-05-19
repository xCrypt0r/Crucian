const Command = require('../../interfaces/Command.js');

class Shutdown extends Command {
    constructor(file) {
        super(file);
    }

    async run(bot) {
        bot.destroy();
    }
}

module.exports = Shutdown;
