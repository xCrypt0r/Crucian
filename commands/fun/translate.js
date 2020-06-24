const Command = require('../../structures/Command.js');
const discord = require('discord.js');
const translate = require('@vitalets/google-translate-api');

class Translate extends Command {
    constructor(file) {
        super(file);
    }

    async run(message, args) {
        if (args.length < 2) {
            message.reply(bot.lang.lackOfArguments);
    
            return;
        }
        
        let language = args.shift();
        let text = args.join(' ');

        translate(text, { to: language }).then(res => {
            let embed = new discord.MessageEmbed()
                .setColor(bot.consts.TRANSLATE_EMBED_COLOR)
                .setTitle(bot.lang.translateSupportedLanguages)
                .setURL(bot.consts.GOOGLE_SUPPORTED_LANGUAGES_URL)
                .setThumbnail(bot.user.avatarURL())
                .addField(translate.languages[res.from.language.iso], text)
                .addField(translate.languages[language], res.text);

            message.channel.send(embed);
        }).catch(err => {
            if (err.message.includes('not supported')) {
                message.channel.send(bot.lang.languageNotSupported.format(language));
            }
        });
    }
}

module.exports = Translate;
