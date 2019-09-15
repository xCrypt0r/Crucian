const discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    message.delete();

    if (args.length <= 1) {
        return;
    }

    let tick = 1000;
    let count = +parseInt(args.pop(), 10),
        content = args.join(' ');

    if (!Number.isInteger(count)) {
        return;
    }

    message.channel.send(formatBomb(count)).then(msg => {
        let timer = setInterval(() => {
            if (count > 0) {
                count--;
                msg.edit(formatBomb(count));
            } else {
                clearInterval(timer);
                msg.edit(`:boom:`);
                setTimeout(() => {
                    msg.edit(content);
                }, tick);
            }
        }, tick);
    });
};

module.exports.config = {
    name: 'timer',
    description: "Shade message for specific seconds",
    alias: ['타이머'],
    cooltime: 3000,
    isOwnerOnly: true
};

function formatBomb(count) {
    return `:bomb: ${'-'.repeat(count)} ${count}`;
}
