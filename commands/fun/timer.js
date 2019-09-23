function formatBomb(count) {
    return `:bomb: ${'-'.repeat(count)} ${count}`;
}

module.exports.run = async (bot, message, args) => {
    message.delete();

    if (args.length < 2) {
        message.reply(bot.lang.lackOfArguments);

        return;
    }

    let count = Number(args.pop());

    if (!Number.isInteger(count) || count < 1) {
        message.reply(bot.lang.invalidArguments);

        return;
    }

    let content = args.join(' ');
    let tick = 1000;

    message.channel.send(formatBomb(count)).then(msg => {
        let timer = setInterval(() => {
            if (count > 0) {
                count--;
                msg.edit(formatBomb(count));
            } else {
                clearInterval(timer);
                msg.edit(':boom:');
                setTimeout(() => {
                    msg.edit(content);
                }, tick);
            }
        }, tick);
    });
};

module.exports.config = {
    name: 'timer',
    description: 'Shade message for specific seconds',
    alias: ['타이머'],
    cooltime: 3000,
    isOwnerOnly: true
};
