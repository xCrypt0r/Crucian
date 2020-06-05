const Command = require('../../interfaces/Command.js');
const fs = require('fs');

class Locale extends Command {
    constructor(file) {
        super(file);
    }

    async run(message, args) {
        if (args.length < 1) {
            message.reply(bot.lang.lackOfArguments);

            return;
        }

        let locale = args[0],
            localePath = `../../assets/json/lang_${locale}`
 
        if (!fs.existsSync(localePath)) {
            bot.lang = require(localePath);

            message.channel.send(bot.lang.currentLocale.format(locale));
        } else {
            message.channel.send(bot.lang.languageNotSupported.format(locale));
        }
    }
}

module.exports = Locale;
