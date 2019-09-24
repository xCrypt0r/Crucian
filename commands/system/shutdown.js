module.exports.run = async (bot) => {
    bot.destroy();
};

module.exports.config = {
    name: 'shutdown',
    description: 'Shutdown bot',
    alias: ['turnoff', '꺼져', '끄기'],
    isOwnerOnly: true
};
