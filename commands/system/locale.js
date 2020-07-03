const Command = require('../../structures/Command.js');
const fs = require('fs');

class Locale extends Command {
    constructor(file) {
        super(file);
    }

    async run(message, args) {
        let locale = args[0],
            localePath = `../../assets/json/lang_${locale}`;
 
        if (!fs.existsSync(localePath)) {
            bot.lang = require(localePath);

            message.channel.send(bot.lang.currentLocale.format(locale));
            bot.user.setActivity(bot.lang.helpManual.activity.format(bot.prefix));
        } else {
            message.channel.send(bot.lang.languageNotSupported.format(locale));
        }
    }
}

module.exports = Locale;
