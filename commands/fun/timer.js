const Command = require('../../interfaces/Command.js');

class Timer extends Command {
    constructor(file) {
        super(file);
    }

    async run(message, args) {
        message.delete();

        if (args.length < 2) {
            message.reply(bot.lang.lackOfArguments);

            return;
        }

        let count = Number(args.pop());

        if (!Number.isInteger(count) || count < 1) {
            message.reply(bot.lang.invalidArguments);

            return;
        }

        let content = args.join(' ');
        let tick = 1000;

        message.channel.send(this.formatBomb(count)).then(msg => {
            let timer = setInterval(() => {
                if (count > 0) {
                    count--;
                    msg.edit(this.formatBomb(count));
                } else {
                    clearInterval(timer);
                    msg.edit(':boom:');
                    setTimeout(() => {
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
