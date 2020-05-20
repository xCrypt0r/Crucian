const Command = require('../../interfaces/Command.js');
const glob = require('glob');

class Help extends Command {
    constructor(file) {
        super(file);
    }

    async run(bot, message) {
        glob('commands/*/*.js', (err, files) => {
            if (err) {
                bot.logger.error(err);

                return;
            }

            let rgx_checkJS = /\.js$/;
            let handlers = files.filter(file => rgx_checkJS.test(file));
            let manual = [];

            handlers.forEach((file, i) => {
                let handler = new (require(`../../${file}`))(file);

                manual.push([
                    `${i + 1}. \`${handler.name}\``,
                    `**Description**: ${handler.description}`,
                    `**Usage**: \`${handler.usage}\``,
                    `**Alias**: ${handler.aliases.join(', ')}`,
                    `**Cooltime**: ${handler.cooltime || 0}`,
                    `**IsOwnerOnly**: ${handler.isOwnerOnly}`
                ].join('\n'));
            });

            let manual_chunks = manual.chunk(5).map(chunk => chunk.join('\n\n'));
            let embedOptions = {
                title: ':blue_book: **도움말**',
                color: '#4ae342',
                thumbnail: bot.user.avatarURL()
            };

            bot.tools.page(message, manual_chunks, embedOptions);
        });
    }
}

module.exports = Help;
