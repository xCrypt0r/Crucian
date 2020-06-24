const Command = require('../../structures/Command.js');
const glob = require('glob');

class Help extends Command {
    constructor(file) {
        super(file);
    }

    async run(message, args) {
        if (args.length > 0) {
            let commands = require('../../assets/json/commands.json'),
                cmd = args.join('');

            message.channel.send(bot.lang.commandManual.format(commands[cmd].usage));

            return;
        }

        glob('commands/*/*.js', (err, handlers) => {
            if (err) {
                bot.logger.error(err);

                return;
            }

            let { helpManual: help } = bot.lang,
                manual = [];

            handlers.forEach((file, i) => {
                let handler = new (require(`../../${file}`))(file);

                manual.push([
                    help.name.format(i + 1, handler.name),
                    help.description.format(handler.description),
                    help.usage.format(handler.usage),
                    help.alias.format(handler.aliases.join(', ')),
                    help.cooldown.format(handler.cooltime || 0),
                    help.isOwnerOnly.format(handler.isOwnerOnly)
                ].join('\n'));
            });

            let manual_chunks = manual.chunk(5).map(chunk => chunk.join('\n\n'));
            let embedOptions = {
                title: help.title,
                color: bot.consts.BOT_MANUAL_COLOR,
                thumbnail: bot.user.avatarURL()
            };

            bot.tools.page(message, manual_chunks, embedOptions);
        });
    }
}

module.exports = Help;
