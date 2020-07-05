const Command = require('../../structures/Command.js');

class Daily extends Command {
    constructor(file) {
        super(file);
    }

    async run(message) {
        let { money } = message.member.economy;
        
        message.reply(bot.lang.moneyInPocket.format(money));
    }
}

module.exports = Daily;
