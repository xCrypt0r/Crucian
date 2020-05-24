const Command = require('../../interfaces/Command.js');
const db = require('../../lib/db.js');

class Log extends Command {
    constructor(file) {
        super(file);
    }

    async run(bot, message) {
        let user = message.mentions.users.first() || message.author;

        if (user.bot) {
            message.reply(bot.lang.notApplicableForBot);

            return;
        }

        let params = user.id;
        let cmd = 'SELECT command, COUNT(command) AS count \
                   FROM log_commands \
                   WHERE user = ? \
                   GROUP BY command \
                   ORDER BY command';

        db.all(cmd, params, (err, rows) => {
            if (err) {
                throw err;
            }

            if (rows.length < 1) {
                message.reply(bot.lang.noRecord);

                return;
            }

            let usage = rows.map(row => bot.lang.commandUsage.format(row.command, row.count));
            let embedOptions = {
                title: '커맨드 사용 횟수'
            };
            let usage_chunks = usage.chunk(10).map(chunk => chunk.join('\n'));

            bot.tools.page(message, usage_chunks, embedOptions);
        });
    }
}

module.exports = Log;
