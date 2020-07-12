const Command = require('../../structures/Command.js');

class Shutdown extends Command {
    constructor(...args) {
        super(...args);
    }

    async run() {
        bot.destroy();
    }
}

module.exports = Shutdown;
