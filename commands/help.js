const fs = require('fs');
const path = require('path');

module.exports.run = async (bot, message, args, tools) => {
    fs.readdir(__dirname, (err, files) => {
        if (err) {
            console.error(err);

            return;
        }

        let rgx_checkJS = /\.js$/;
        let scriptName = path.basename(__filename);
        let handlers = files.filter(file => rgx_checkJS.test(file) && file !== scriptName);
        let manual = [];

        handlers.forEach((file, i) => {
            let handler = require(`${__dirname}/${file}`);
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
            'color': '#4ae342',
            'thumbnail': bot.user.avatarURL
        };

        tools.page(message, manual_chunks, ':blue_book: **도움말**', embedOptions);
    });
};

module.exports.config = {
    name: 'help',
    description: 'Informs how to use this bot',
    alias: ['도움', '도움말'],
    isOwnerOnly: false
};
