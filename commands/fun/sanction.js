const Command = require('../../interfaces/Command.js');

class Sanction extends Command {
    constructor(file) {
        super(file, {
            name: 'sanction',
            description: 'Sanction bot',
            usage: 'sanction',
            aliases: ['돌았냐', '뒤질래', '디질래', '맞을래', '제재', '죽을래', '처벌', '혼날래'],
            isOwnerOnly: false
        });
    }

    async run(bot, message) {
        let reaction = bot.lang.sanctionReaction.random();

        message.channel.send(reaction);
    }
}

module.exports = Sanction;