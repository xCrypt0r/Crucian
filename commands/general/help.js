const Command = require('../../structures/Command.js');

class Help extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message, args) {
        let commands = bot.commands;

        if (args.length > 0) {
            let command = commands.get(args.join(''));

            if (!command) {
                message.reply(bot.lang.invalidArguments);

                return;
            }

            message.channel.send(bot.lang.commandManual.format(command.usage));

            return;
        }

        let { helpManual: help } = bot.lang,
            manual = [],
            i = 0;

        for (let [name, details] of Array.from(commands)) {
            manual.push([
                help.name.format(++i, name),
                help.category.format(details.category),
                help.description.format(details.description),
                help.usage.format(details.usage),
                help.alias.format(details.aliases.join(', ')),
                help.cooldown.format(details.cooldown || 0),
                help.isOwnerOnly.format(details.isOwnerOnly)
            ].join('\n'));
        }

        let manualChunks = manual.chunk(5).map(chunk => chunk.join('\n\n')),
            embedOptions = {
                title: help.title,
                color: bot.consts.COLOR.BOT_MANUAL,
                thumbnail: bot.user.avatarURL()
            };

        bot.tools.page(message, manualChunks, embedOptions);
    }
}

module.exports = Help;
