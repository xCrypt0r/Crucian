const Command = require('../../structures/Command.js');
const GuildModel = require('../../models/Guild.js');

class Prefix extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message, args) {
        if (!message.member.hasPermission('MANAGE_GUILD')) {
            message.reply(bot.lang.lackOfPermission.random());

            return;
        }

        let guild = message.guild,
            prefix = args[0];

        if (args.length > 0) {
            await GuildModel.updateOne(
                { id: guild.id },
                { $set: { prefix: prefix } },
                { upsert: true }
            );

            message.channel.send(bot.lang.prefixChanged.format(prefix));
        } else {
            let doc = await GuildModel.findOne({ id: guild.id });

            message.channel.send(bot.lang.currentPrefix.format(doc.prefix));
        }
    }
}

module.exports = Prefix;
