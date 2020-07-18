const Command = require('../../structures/Command.js');
const LogModel = require('../../models/Log.js');

class Log extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message) {
        let member = message.mentions.members.first() || message.member;

        if (member.user.bot) {
            message.reply(bot.lang.notApplicableForBot);

            return;
        }

        let res = [],
            logs = await LogModel.find({ fullId: member.fullId });

        logs = logs.reduce((acc, curr) => (acc[curr.command] = ++acc[curr.command] || 1, acc), {});

        for (let [command, count] of Object.entries(logs)) {
            res.push(bot.lang.commandUsage.format(command, count));
        }

        let logChunks = res.chunk(10).map(chunk => chunk.join('\n')),
            embedOptions = {
                title: bot.lang.userInformation.commandUsage.name.format(member.user.username)
            };

        bot.tools.page(message, logChunks, embedOptions);
    }
}

module.exports = Log;
