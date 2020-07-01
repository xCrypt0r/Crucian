const { MessageEmbed } = require('discord.js');

module.exports = {
    page: async (message, pages, options = {}) => {
        let page = 1,
            { page: { footer } } = bot.lang,
            embed = new MessageEmbed()
                .setColor(bot.consts.COLOR.PAGE_DEFAULT)
                .setDescription(pages[page - 1])
                .setFooter(footer.format(page, pages.length));

        Object.assign(embed, options);
        
        let sentMessage = await message.channel.send(embed),
            backwards = sentMessage.createReactionCollector('◀', { time: 100000 }),
            forwards = sentMessage.createReactionCollector('▶', { time: 100000 });

        await Promise.all([sentMessage.react('◀'), sentMessage.react('▶')]);

        backwards.on('collect', async reaction => {
            if (reaction.count <= 1 || page === 1) {
                await reaction.revert();

                return;
            }

            page--;
            embed.setDescription(pages[page - 1]);
            embed.setFooter(footer.format(page, pages.length));
            await Promise.all([sentMessage.edit(embed), reaction.revert()]);
        });

        forwards.on('collect', async reaction => {
            if (reaction.count <= 1 || page === pages.length) {
                await reaction.revert();

                return;
            }

            page++;
            embed.setDescription(pages[page - 1]);
            embed.setFooter(footer.format(page, pages.length));
            await Promise.all([sentMessage.edit(embed), reaction.revert()]);
        });

        return sentMessage;
    }
};
