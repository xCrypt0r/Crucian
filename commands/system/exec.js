const Command = require('../../interfaces/Command.js');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

class Exec extends Command {
    constructor(file) {
        super(file);
    }

    async run(message, args) {
        if (args.length < 1) {
            message.reply(bot.lang.lackOfArguments);

            return;
        }

        let cmd = args.join(' ');

        try {
            let { stdout: res } = await exec(cmd);

            message.channel.send(bot.lang.shellMessage.format(cmd, res), {
                split: true 
            });
        } catch (e) {
            bot.logger.error(e.stderr || e.message);
            message.channel.send(bot.lang.somethingWentWrong.random());
        }
    }
}

module.exports = Exec;
