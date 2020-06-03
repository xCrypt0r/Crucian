const Command = require('../../interfaces/Command.js');

class Eval extends Command {
    constructor(file) {
        super(file);
    }

    async run(message, args) {
        let code = args.join(' '),
            res;
        
        try {
            res = await new Promise((resolve, reject) => resolve(eval(code)));

            if (typeof res !== 'string') {
                res = require('util').inspect(res, { depth: 0 });
            }

            message.channel.send(res, { split: true });
        } catch (e) {
            bot.logger.error(e);
            message.channel.send(bot.lang.somethingWentWrong.random());
        }
    }
}

module.exports = Eval;
