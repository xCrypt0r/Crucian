const lang = require('../data/lang.json');
const ytdl = require('ytdl-core');

async function play(bot, options, data) {
    bot.channels.get(data.queue[0].announceChannel)
        .send(lang.nowPlaying.format(data.queue[0].songTitle, data.queue[0].requester));
    data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, {filter: 'audioonly'}));
    data.dispatcher.guildID = data.guildID;
    data.dispatcher.once('end', () => {
        finish(bot, options, data);
    });
}

function finish(bot, options, data) {
    let fetched = options.active.get(data.guildID);

    fetched.queue.shift();

    if (fetched.queue.length > 0) {
        options.active.set(data.guildID, fetched);
        play(bot, options, fetched);
    } else {
        options.active.delete(data.guildID);

        let voiceChannel = bot.guilds.get(data.guildID).me.voiceChannel;

        if (voiceChannel) {
            voiceChannel.leave();
        }
    }
}

module.exports.run = async (bot, message, args, tools, options) => {
    if (!message.member.voiceChannel) {
        message.reply(lang.notInVoiceChannel);

        return;
    }

    if (args.length < 1) {
        message.reply(lang.lackOfArguments);

        return;
    }
    
    let url = args[0];
    let validate = await ytdl.validateURL(url);

    if (!validate) {
        message.reply(lang.invalidURL.random());

        return;
    }

    let unplayable = false;
    let info = await ytdl.getInfo(url).catch(err => {
        unplayable = true;
    });

    if (unplayable) {
        message.reply(lang.unplayableVideo);

        return;
    }

    let data = options.active.get(message.guild.id) || {};

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
        play(bot, options, data);
    } else {
        message.channel.send(lang.addedToQueue.format(info.title, message.author.tag));
    }

    options.active.set(message.guild.id, data);
};

module.exports.config = {
    name: 'play',
    description: 'Play music with given URL',
    alias: ['p', '재생', '틀어'],
    cooltime: 2000,
    isOwnerOnly: false
};
