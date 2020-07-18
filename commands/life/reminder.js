const Command = require('../../structures/Command.js');
const MemberModel = require('../../models/Member.js');
const moment = require('moment');

class Reminder extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message, args) {
        let member = message.member;

        if (!args.length) {
            let { reminders } = await member.info;

            if (!reminders.length) {
                message.reply(bot.lang.reminderEmpty);

                return;
            }

            reminders = reminders
                .sort((a, b) => b.timestamp - a.timestamp)
                .map(reminder => bot.lang.reminderItem.format(reminder.todo, moment(reminder.timestamp).fromNow()));

            let reminderChunks = reminders.chunk(10).map(chunk => chunk.join('\n'));
            let embedOptions = {
                title: bot.lang.reminderTitle,
                author: {
                    name: member.user.tag,
                    icon_url: member.user.displayAvatarURL(),
                }
            };

            bot.tools.page(message, reminderChunks, embedOptions);

            return;
        }

        let todo = args.join(' '),
            timestamp = message.createdTimestamp;

        await MemberModel.updateOne(
            { fullId: member.fullId },
            { $push: { reminders: { todo, timestamp } } }
        );

        message.reply(bot.lang.reminderSet.format(todo));
    }
}

module.exports = Reminder;
