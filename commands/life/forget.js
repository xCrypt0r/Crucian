const Command = require('../../structures/Command.js');
const MemberModel = require('../../models/Member.js');

class Forget extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message, args) {
        let todo = args.join(' '),
            member = message.member,
            { reminders } = await member.info;

        if (!reminders.length) {
            message.reply(bot.lang.reminderEmpty);

            return;
        }

        let forgot = await MemberModel.updateOne(
            { fullId: member.fullId },
            { $pull: { reminders: { todo: todo } } }
        );

        message.reply(bot.lang.reminderRemoved.format(todo));
    }
}

module.exports = Forget;
