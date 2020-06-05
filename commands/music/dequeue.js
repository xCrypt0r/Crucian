const Command = require('../../interfaces/Command.js');

class Dequeue extends Command {
    constructor(file) {
        super(file);
    }

    async run(message, args) {
        if (args.length < 1) {
            message.reply(bot.lang.lackOfArguments);
    
            return;
        }
    
        let index = Number(args[0]);
        let fetched = bot.active.get(message.guild.id);
    
        if (!fetched) {
            message.reply(bot.lang.noMusicPlaying);
    
            return;
        }
    
        if (!Number.isInteger(index) || index < 0 || index > fetched.queue.length) {
            message.reply(bot.lang.invalidArguments);
    
            return;
        }

        switch (index) {
            case 0: {
                fetched.queue.splice(1);

                break;
            }

            case 1: {
                let skip = bot.commands.get('skip');
    
                skip.run(message);

                break;
            }

            default: {
                fetched.queue.splice(index - 1, 1);
            }
        }
    
        message.reply(bot.lang.dequeueSuccess.format(index));
    }
}

module.exports = Dequeue;
