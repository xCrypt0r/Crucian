const Command = require('../../interfaces/Command.js');
const figlet = require('figlet');

class Ascii extends Command {
    constructor(file) {
        super(file, {
            name: 'ascii',
            description: 'Make 3D ascii art with given string',
            usage: 'ascii #{string}',
            aliases: ['아스키'],
            cooltime: 1500,
            isOwnerOnly: false
        });
    }

    async run(bot, message, args) {
        if (args.length < 1) {
            message.reply(bot.lang.lackOfArguments);
    
            return;
        }

        figlet.text(args.join(' '), {
            font: 'Standard',
            horizontalLayout: 'default',
            verticalLayout: 'default'
        }, (err, rendered) => {
            if (err) {
                message.reply(bot.lang.somethingWentWrong.random());

                return;
            }

            if (rendered.length > 2000) {
                message.reply(bot.lang.messageTooLong.random());

                return;
            }

            if (rendered.trim().length === 0) {
                message.reply(bot.lang.invalidArguments);

                return;
            }

            message.channel.send(rendered, { code: 'md' });
        });
    }
}

module.exports = Ascii;