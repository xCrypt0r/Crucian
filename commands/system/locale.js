const Command = require('../../structures/Command.js');
const fs = require('fs');

class Locale extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message, args) {
        let locale = args[0],
            localePath = `../../assets/json/lang_${locale}`;

        if (!fs.existsSync(localePath)) {
            bot.lang = require(localePath);

            message.channel.send(bot.lang.currentLocale.format(locale));
        } else {
            message.channel.send(bot.lang.languageNotSupported.format(locale));
        }
    }
}

module.exports = Locale;
