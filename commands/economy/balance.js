const Command = require('../../structures/Command.js');

class Balance extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message) {
        let member = message.mentions.members.first() || message.member,
            { money } = await member.info;

        message.channel.send(bot.lang.moneyInPocket.format(member.user.tag, money));
    }
}

module.exports = Balance;
