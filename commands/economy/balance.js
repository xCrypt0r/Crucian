const Command = require('../../structures/Command.js');

/**
 * Class to show balance of members
 *
 * @class Balance
 * @extends {Command}
 */
class Balance extends Command {
    /**
     * Creates an instance of Balance
     *
     * @param {string} file
     */
    constructor(file) {
        super(file);
    }

    /**
     * Show balance of a member
     *
     * @param {Message} message
     */
    async run(message) {
        let member = message.mentions.members.first() || message.member,
            { money } = member.info;

        message.channel.send(bot.lang.moneyInPocket.format(member.user.tag, money));
    }
}

module.exports = Balance;
