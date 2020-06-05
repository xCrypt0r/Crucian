const Command = require('../../structures/Command.js');

class Slowmode extends Command {
    constructor(file) {
        super(file);
    }

    async run(message, args) {
        if (!message.member.hasPermission('MANAGE_GUILD')) {
            message.reply(bot.lang.lackOfPermission.random());

            return;
        }

        if (args.length < 1) {
            message.reply(bot.lang.lackOfArguments);

            return;
        }

        let time = Number(args[0]);
        
        if (!Number.isInteger(time) || time < 0) {
            message.reply(bot.lang.invalidArguments);

            return;
        }

        message.channel.setRateLimitPerUser(time).then(() => {
            message.channel.send(
                time !== 0
                    ? bot.lang.slowmodeEnabled.format(time)
                    : bot.lang.slowmodeDisabled
            );
        });
    }
}

module.exports = Slowmode;
