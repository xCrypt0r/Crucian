const Command = require('../../interfaces/Command.js');
const math = require('mathjs');

class Calc extends Command {
    constructor(file) {
        super(file);
    }

    async run(bot, message, args) {
        if (args.length < 1) {
            message.reply(bot.lang.lackOfArguments);
    
            return;
        }
    
        let input = args.join(' '),
            output;
    
        try {
            output = math.evaluate(input);
        } catch (e) {
            message.reply(bot.lang.invalidCalculation);
    
            return;
        }
    
        message.channel.send(bot.lang.calcResult.format(input, output));
    }
}

module.exports = Calc;