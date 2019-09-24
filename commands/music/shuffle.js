module.exports.run = async (bot, message) => {
    let fetched = bot.active.get(message.guild.id);
    
    if (!fetched) {
        message.reply(bot.lang.noMusicPlaying);

        return;
    }

    let nowPlaying = fetched.queue.shift();

    fetched.queue = fetched.queue.shuffle();

    fetched.queue.unshift(nowPlaying);
    message.reply(bot.lang.shuffleCompleted.random());
};

module.exports.config = {
    name: 'shuffle',
    description: 'Shuffle songs in queue',
    usage: 'shuffle',
    alias: ['random', 'randomize', 'sh', '랜덤', '셔플'],
    cooltime: 2000,
    isOwnerOnly: false
};
