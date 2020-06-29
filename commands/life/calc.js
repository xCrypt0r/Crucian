const Command = require('../../structures/Command.js');
const math = require('mathjs');

class Calc extends Command {
    constructor(file) {
        super(file);
    }

    async run(message, args) {
        let input = args.join(' '),
            output;
    
        try {
            output = math.evaluate(input);
            message.channel.send(bot.lang.calcResult.format(input, output));
        } catch (e) {
            bot.logger.error(e);
            message.reply(bot.lang.invalidCalculation);
        }
    }
}

module.exports = Calc;
