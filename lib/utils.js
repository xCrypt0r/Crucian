const discord = require('discord.js');

module.exports = {
    page: async (message, pages, options = []) => {
        let page = 1;
        let embed = new discord.MessageEmbed()
            .setColor(0xff0000)
            .setDescription(pages[page - 1])
            .setFooter(`Page ${page} of ${pages.length}`);

        Object.assign(embed, options);
        
        let sentMessage = await message.channel.send(embed);
        let backwardsFilter = reaction => reaction.emoji.name === '◀',
            forwardsFilter = reaction => reaction.emoji.name === '▶',
            backwards = sentMessage.createReactionCollector(backwardsFilter, { time: 100000 }),
            forwards = sentMessage.createReactionCollector(forwardsFilter, { time: 100000 });

        await Promise.all([sentMessage.react('◀'), sentMessage.react('▶')]);

        backwards.on('collect', async reaction => {
            if (reaction.count <= 1 || page === 1) {
                return;
            }

            page--;
            embed.setDescription(pages[page - 1]);
            embed.setFooter(`Page ${page} of ${pages.length}`);
            await sentMessage.edit(embed);

            let users = await reaction.users.fetch(),
                reactedUsers = users.filter(user => !user.bot);

            reactedUsers.forEach(reactedUser => reaction.users.remove(reactedUser));
        });

        forwards.on('collect', async reaction => {
            if (reaction.count <= 1 || page === pages.length) {
                return;
            }

            page++;
            embed.setDescription(pages[page - 1]);
            embed.setFooter(`Page ${page} of ${pages.length}`);
            await sentMessage.edit(embed);

            let users = await reaction.users.fetch(),
                reactedUsers = users.filter(user => !user.bot);

            reactedUsers.forEach(reactedUser => reaction.users.remove(reactedUser));
        });

        return sentMessage;
    },
    createRole: async (message, name, options = {}) => {
        if (!name) {
            bot.logger.error('No role name was given');

            return;
        }

        options.name = name;
        options.color = options.color || 0x000000;

        return message.guild.roles.create({ data: options });
    },
    addRole: async (message, user, role) => {
        await message.guild.member(user).roles
            .add(role)
            .catch(bot.logger.error);
    },
    removeRole: async (message, user, role) => {
        await message.guild.member(user).roles
            .remove(role)
            .catch(bot.logger.error);
    }
};
