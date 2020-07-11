const Command = require('../../structures/Command.js');

class AddMoney extends Command {
    constructor(file) {
        super(file);
    }

    async run(message, args) {
        let amount = Number(args.pop());

        if (!Number.isInteger(amount) || amount <= 0) {
            message.reply(bot.lang.invalidArguments);

            return;
        }

        let member = message.mentions.members.first() || message.member;

        if (!member) {
            message.reply(bot.lang.cantFindUser);

            return;
        }

        member.giveMoney(amount);
        message.reply(bot.lang.moneyInPocket.format(member.info.money));
    }
}

module.exports = AddMoney;
