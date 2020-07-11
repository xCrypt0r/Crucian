const Command = require('../../structures/Command.js');

class GetLines extends Command {
    constructor(file) {
        super(file);
    }

    async run(message, args) {
        let extension = args[0],
            shell = bot.commands.get('exec'),
            cmd = extension
                ? `git ls-files | grep "**.${extension}$" | xargs wc -l`
                : 'git ls-files | xargs wc -l';

        shell.run(message, [cmd]);
    }
}

module.exports = GetLines;
