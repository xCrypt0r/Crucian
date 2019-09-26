const discord = require('discord.js');

module.exports = {
    page: (message, pages, options = []) => {
        let page = 1;
        let embed = new discord.RichEmbed()
            .setColor(options.color || 0xff0000)
            .setDescription(pages[page - 1])
            .setFooter(`Page ${page} of ${pages.length}`);

        if (options.title) {
            embed.setTitle(options.title);
        }

        if (options.thumbnail) {
            embed.setThumbnail(options.thumbnail);
        }

        let messagePromise = message.channel.send(embed).then(sentMessage => {
            sentMessage.react('◀').then(() => {
                sentMessage.react('▶');

                let backwardsFilter = reaction => reaction.emoji.name === '◀',
                    forwardsFilter = reaction => reaction.emoji.name === '▶';
                let backwards = sentMessage.createReactionCollector(backwardsFilter, { time: 100000 }),
                    forwards = sentMessage.createReactionCollector(forwardsFilter, { time: 100000 });

                backwards.on('collect', reaction => {
                    if (reaction.count <= 1) {
                        return;
                    }

                    if (page === 1) {
                        return;
                    }

                    page--;
                    embed.setDescription(pages[page - 1]);
                    embed.setFooter(`Page ${page} of ${pages.length}`);
                    sentMessage.edit(embed);

                    reaction.fetchUsers().then(users => {
                        let reactedUsers = users.filter(user => user.username !== '붕어');

                        reactedUsers.forEach(reactedUser => {
                            reaction.remove(reactedUser);
                        });
                    });
                });

                forwards.on('collect', reaction => {
                    if (reaction.count <= 1) {
                        return;
                    }

                    if (page === pages.length) {
                        return;
                    }

                    page++;
                    embed.setDescription(pages[page - 1]);
                    embed.setFooter(`Page ${page} of ${pages.length}`);
                    sentMessage.edit(embed);

                    reaction.fetchUsers().then(users => {
                        let reactedUsers = users.filter(user => user.username !== '붕어');

                        reactedUsers.forEach(reactedUser => {
                            reaction.remove(reactedUser);
                        });
                    });
                });
            });

            return sentMessage;
        });

        return messagePromise;
    }
};