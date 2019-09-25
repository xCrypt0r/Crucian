const Command = require('../../interfaces/Command.js');

class Select extends Command {
    constructor(file) {
        super(file, {
            name: 'select',
            description: 'Select one between multiple items',
            usage: 'select #{option1} #{option2} #{option3} ...',
            aliases: ['choice', 'choose', '골라', '뽑아', '선택'],
            cooltime: 500,
            isOwnerOnly: false
        });
    }

    async run(bot, message, args) {
        if (args.length < 1) {
            message.reply(bot.lang.lackOfArguments);
    
            return;
        }
    
        message.reply(bot.lang.chooseEnd.random().format(args.random()));
    }
}

module.exports = Select;