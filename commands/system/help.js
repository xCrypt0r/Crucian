const glob = require('glob');

module.exports.run = async (bot, message) => {
    glob('commands/*/*.js', (err, files) => {
        if (err) {
            console.error(err);

            return;
        }

        let rgx_checkJS = /\.js$/;
        let handlers = files.filter(file => rgx_checkJS.test(file));
        let manual = [];

        handlers.forEach((file, i) => {
            let handler = require(`../../${file}`);
            let config = handler.config;

            manual.push([
                `${i + 1}. \`${config.name}\``,
                `Description: ${config.description}`,
                `Alias: ${config.alias.join(', ')}`,
                `Cooltime: ${config.cooltime || 0}`,
                `IsOwnerOnly: ${config.isOwnerOnly}`
            ].join('\n'));
        });

        let manual_chunks = manual.chunk(5).map(chunk => chunk.join('\n\n'));
        let embedOptions = {
            title: ':blue_book: **도움말**',
            color: '#4ae342',
            thumbnail: bot.user.avatarURL
        };

        bot.tools.page(message, manual_chunks, embedOptions);
    });
};

module.exports.config = {
    name: 'help',
    description: 'Informs how to use this bot',
    alias: ['도움', '도움말'],
    isOwnerOnly: false
};
