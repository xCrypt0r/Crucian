const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');
const translate = require('@vitalets/google-translate-api');

class Translate extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message, args) {
        let language = args.shift(),
            text = args.join(' ');

        try {
            let res = await translate(text, { to: language });
            let embed = new MessageEmbed()
                .setColor(bot.consts.COLOR.TRANSLATE_EMBED)
                .setTitle(bot.lang.translateSupportedLanguages)
                .setURL(bot.consts.URL.GOOGLE_SUPPORTED_LANGUAGES)
                .setThumbnail(bot.user.avatarURL())
                .addFields(
                    {
                        name: translate.languages[res.from.language.iso],
                        value: text,
                        inline: true
                    },
                    {
                        name: translate.languages[language],
                        value: res.text,
                        inline: true
                    }
                );

            message.channel.send(embed);
        } catch (e) {
            e.message.includes('not supported')
                ? message.channel.send(bot.lang.languageNotSupported.format(language))
                : bot.logger.error();
        }
    }
}

module.exports = Translate;
