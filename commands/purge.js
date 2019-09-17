const lang = require('../data/lang.json');

module.exports.run = async (bot, message, args) => {
    let limit = Number(args[0]);

    if (!Number.isInteger(limit) || limit < 1) {
        message.reply(lang.invalidArguments);

        return;
    }

    if (limit > 50) {
        message.reply(lang.deleteTooMuch.random().format(limit));

        return;
    }

    message.channel.fetchMessages().then(fetchedMessages => {
        let messagesToDelete = fetchedMessages
            .array()
            .filter(fetchedMessage => fetchedMessage.author.id === message.author.id)
            .slice(0, limit + 1);

        message.channel.bulkDelete(messagesToDelete)
                       .then(deletedMessages => {
                           message.reply(lang.deleteEnd.random().format(deletedMessages.size - 1));
                       })
                       .catch(console.error);
    }).catch(console.error);
};

module.exports.config = {
    name: 'purge',
    alias: ['clear', 'del', 'delete', 'remove', 'rm', '삭제', '지워'],
    cooltime: 5000,
    isOwnerOnly: false
};
