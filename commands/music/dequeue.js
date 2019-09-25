const Command = require('../../interfaces/Command.js');

class Dequeue extends Command {
    constructor(file) {
        super(file, {
            name: 'dequeue',
            description: 'Delete song in queue with given number',
            usage: 'dequeue #{number}',
            aliases: ['dq', '빼'],
            cooltime: 2000,
            isOwnerOnly: false
        });
    }

    async run(bot, message, args) {
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
    
        if (!Number.isInteger(index) || index < 1 || index > fetched.queue.length) {
            message.reply(bot.lang.invalidArguments);
    
            return;
        }
    
        if (index === 1) {
            let skip = bot.commands.get('skip');
    
            skip.run(bot, message);
        } else {
            fetched.queue.splice(index - 1, 1);
        }
    
        message.reply(bot.lang.dequeueSuccess.format(index));
    }
}

module.exports = Dequeue;
