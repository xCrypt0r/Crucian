const Command = require('../../interfaces/Command.js');
const ytdl = require('ytdl-core');

class Play extends Command {
    constructor(file) {
        super(file, {
            name: 'play',
            description: 'Play music with given URL or keyword',
            usage: 'play #{URL|keyword}',
            aliases: ['p', '재생', '틀어'],
            cooltime: 2000,
            isOwnerOnly: false
        });
    }
    
    async run(bot, message, args) {
        if (!message.member.voiceChannel) {
            message.reply(bot.lang.notInVoiceChannel);
    
            return;
        }
    
        if (args.length < 1) {
            message.reply(bot.lang.lackOfArguments);
    
            return;
        }
        
        let url = args[0];
        let validate = await ytdl.validateURL(url);
    
        if (!validate) {
            let searcher = bot.commands.get('search');
    
            searcher.run(bot, message, args);
    
            return;
        }
    
        let unplayable = false;
        let info = await ytdl.getInfo(url).catch(err => {
            unplayable = true;
        });
    
        if (unplayable) {
            message.reply(bot.lang.unplayableVideo);
    
            return;
        }
    
        let data = bot.active.get(message.guild.id) || {};
    
        if (!data.connection) {
            data.connection = await message.member.voiceChannel.join();
        }
    
        if (!data.queue) {
            data.queue = [];
        }
    
        data.guildID = message.guild.id;
        data.queue.push({
            songTitle: info.title,
            requester: message.author.tag,
            url: url,
            announceChannel: message.channel.id
        });
    
        if (!data.dispatcher) {
            this.play(bot, data);
        } else {
            message.channel.send(bot.lang.addedToQueue.format(info.title, message.author.tag));
        }
    
        bot.active.set(message.guild.id, data);
    }

    async play(bot, data) {
        bot.channels.get(data.queue[0].announceChannel)
            .send(bot.lang.nowPlaying.format(data.queue[0].songTitle, data.queue[0].requester));
        data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, {filter: 'audioonly'}));
        data.dispatcher.guildID = data.guildID;
        data.dispatcher.once('end', () => {
            this.finish(bot, data);
        });
    }

    async finish(bot, data) {
        let fetched = bot.active.get(data.guildID);

        fetched.queue.shift();

        if (fetched.queue.length > 0) {
            bot.active.set(data.guildID, fetched);
            this.play(bot, fetched);
        } else {
            bot.active.delete(data.guildID);
        }
    }
}

module.exports = Play;