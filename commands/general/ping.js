const Command = require('../../structures/Command.js');

/**
 * Class to show latency
 *
 * @class Ping
 * @extends {Command}
 */
class Ping extends Command {
    /**
     * Creates an instance of Ping
     *
     * @param {string} file
     */
    constructor(file) {
        super(file);
    }

    /**
     * Show latency
     *
     * @param {Message} message
     */
    async run(message) {
        let ping = bot.ws.ping.toFixed(1);

        message.reply(bot.lang.pingMessages.random().format(ping));
    }
}

module.exports = Ping;
