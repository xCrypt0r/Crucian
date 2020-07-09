const Command = require('../../structures/Command.js');

class NowPlaying extends Command {
    constructor(file) {
        super(file);
    }

    async run(message) {
        let fetched = bot.active.get(message.guild.id);
    
        if (!fetched) {
            message.reply(bot.lang.noMusicPlaying);

            return;
        }
        
        let { songTitle: title, requester } = fetched.queue[0]; 
        
        message.reply(bot.lang.nowPlaying.format(title, requester));
    }
}

module.exports = NowPlaying;
