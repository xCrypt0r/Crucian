const Command = require('../../structures/Command.js');

class Timer extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message, args) {
        message.delete();

        let count = Number(args.pop());

        if (!Number.isInteger(count) || count < 1) {
            message.reply(bot.lang.invalidArguments);

            return;
        }

        let content = args.join(' ');
        let tick = 1000;

        message.channel.send(this.formatBomb(count)).then(msg => {
            let timer = bot.setInterval(() => {
                if (count > 0) {
                    count--;
                    msg.edit(this.formatBomb(count));
                } else {
                    clearInterval(timer);
                    msg.edit(':boom:');
                    bot.setTimeout(() => {
                        msg.edit(content);
                    }, tick);
                }
            }, tick);
        });
    }

    formatBomb(count) {
        return `:bomb: ${'-'.repeat(count)} ${count}`;
    }
}

module.exports = Timer;
