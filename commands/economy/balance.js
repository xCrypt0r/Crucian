const Command = require('../../structures/Command.js');

class Balance extends Command {
    constructor(file) {
        super(file);
    }

    async run(message) {
        let member = message.mentions.members.first() || message.member,
            { money } = member.info;

        message.channel.send(bot.lang.moneyInPocket.format(member.user.tag, money));
    }
}

module.exports = Balance;
