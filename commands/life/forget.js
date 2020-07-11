const Command = require('../../structures/Command.js');
const moment = require('moment');

class Forget extends Command {
    constructor(file) {
        super(file);
    }

    async run(message, args) {
        let index = Number(args[0]);

        if (!Number.isInteger(index) || index < 1) {
            message.reply(bot.lang.invalidArguments);

            return;
        }

        let { reminders } = message.member.info,
            forgot = reminders.splice(index - 1, 1)[0] || { todo: '' };

        bot.info.set(message.member.fullId, reminders, 'reminders');
        message.reply(bot.lang.reminderRemoved.format(forgot.todo));
    }
}

module.exports = Forget;
