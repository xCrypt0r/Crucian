const Command = require('../../structures/Command.js');

class Sanction extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message) {
        let reaction = bot.lang.sanctionReaction.random();

        message.channel.send(reaction);
    }
}

module.exports = Sanction;
