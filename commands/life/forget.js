const Command = require('../../structures/Command.js');
const moment = require('moment');

class Forget extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message, args) {
        let index = Number(args[0]);

        if (!Number.isInteger(index) || index < 1) {
            message.reply(bot.lang.invalidArguments);

            return;
        }

        let { reminders } = message.member.info;

        if (!reminders.length) {
            message.reply(bot.lang.reminderEmpty);

            return;
        }

        let forgot = reminders
            .sort((a, b) => b.timestamp - a.timestamp)
            .splice(index - 1, 1)[0] || { todo: '' };

        bot.info.set(message.member.fullId, reminders, 'reminders');
        message.reply(bot.lang.reminderRemoved.format(forgot.todo));
    }
}

module.exports = Forget;
