const Command = require('../../structures/Command.js');

class Purge extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message, args) {
        let limit = Number(args[0]);

        if (!Number.isInteger(limit) || limit < 1) {
            message.reply(bot.lang.invalidArguments);

            return;
        }

        if (limit > 50) {
            message.reply(bot.lang.deleteTooMuch.random().format(limit));

            return;
        }

        let fetchedMessages = await message.channel.messages.fetch(),
            messagesToDelete = fetchedMessages
                .array()
                .filter(fetchedMessage => fetchedMessage.author.id === message.author.id)
                .slice(0, limit + 1);

        let deletedMessages = await message.channel.bulkDelete(messagesToDelete);

        message.reply(bot.lang.deleteEnd.random().format(deletedMessages.size - 1));
    }
}

module.exports = Purge;
