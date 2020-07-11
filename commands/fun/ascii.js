const Command = require('../../structures/Command.js');
const figlet = require('figlet');

/**
 * Class to make ascii art
 *
 * @class Ascii
 * @extends {Command}
 */
class Ascii extends Command {
    /**
     * Creates an instance of Ascii
     *
     * @param {string} file
     */
    constructor(file) {
        super(file);
    }

    /**
     * Make ascii art
     *
     * @param {Message} message
     * @param {string[]} args
     */
    async run(message, args) {
        figlet.text(args.join(' '), {
            font: 'Standard',
            horizontalLayout: 'default',
            verticalLayout: 'default'
        }, (err, rendered) => {
            if (err) {
                message.reply(bot.lang.somethingWentWrong.random());

                return;
            }

            if (rendered.length > 2000) {
                message.reply(bot.lang.messageTooLong.random());

                return;
            }

            if (rendered.trim().length === 0) {
                message.reply(bot.lang.invalidArguments);

                return;
            }

            message.channel.send(rendered, { code: 'md' });
        });
    }
}

module.exports = Ascii;
