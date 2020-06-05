const Command = require('../../structures/Command.js');

class Shutdown extends Command {
    constructor(file) {
        super(file);
    }

    async run() {
        bot.destroy();
    }
}

module.exports = Shutdown;
