const Command = require('../../structures/Command.js');

class Log extends Command {
    constructor(file) {
        super(file);
    }

    async run(message) {
        let member = message.mentions.members.first() || message.member;

        if (member.user.bot) {
            message.reply(bot.lang.notApplicableForBot);

            return;
        }

        let res = [],
            id = member.id,
            guild = member.guild.id,
            usage = bot.usage
                .array()
                .filter(u => u.id === id && u.guild === guild)
                .reduce((acc, curr) => (acc[curr.command] = ++acc[curr.command] || 1, acc), {});

        for (let [command, count] of Object.entries(usage)) {
            res.push(bot.lang.commandUsage.format(command, count));
        }

        let usageChunks = res
                .chunk(10)
                .map(chunk => chunk.join('\n')),
            embedOptions = {
                title: bot.lang.userInformation.commandUsage.name.format(member.user.username)
            };

        bot.tools.page(message, usageChunks, embedOptions);
    }
}

module.exports = Log;
