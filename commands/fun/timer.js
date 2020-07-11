const Command = require('../../structures/Command.js');

/**
 * Class to hide message for a specified time
 *
 * @class Timer
 * @extends {Command}
 */
class Timer extends Command {
    /**
     * Creates an instance of Timer
     *
     * @param {string} file
     */
    constructor(file) {
        super(file);
    }

    /**
     * Hide message for a specified time and show it after the time
     *
     * @param {Message} message
     * @param {string[]} args
     */
    async run(message, args) {
        message.delete();

        let count = Number(args.pop());

        if (!Number.isInteger(count) || count < 1) {
            message.reply(bot.lang.invalidArguments);

            return;
        }

        let content = args.join(' ');
        let tick = 1000;

        message.channel.send(this.formatBomb(count)).then(msg => {
            let timer = bot.setInterval(() => {
                if (count > 0) {
                    count--;
                    msg.edit(this.formatBomb(count));
                } else {
                    clearInterval(timer);
                    msg.edit(':boom:');
                    bot.setTimeout(() => {
                        msg.edit(content);
                    }, tick);
                }
            }, tick);
        });
    }

    /**
     * Function to format string in the form of a bomb
     *
     * @param {number} count
     * @returns {string}
     */
    formatBomb(count) {
        return `:bomb: ${'-'.repeat(count)} ${count}`;
    }
}

module.exports = Timer;
