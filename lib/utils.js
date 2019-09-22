const discord = require('discord.js');

module.exports = {
    page: function(message, pages, options = []) {
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

        message.channel.send(embed).then(msg => {
            msg.react('◀').then(() => {
                msg.react('▶');

                let backwardsFilter = (reaction, user) => reaction.emoji.name === '◀',
                    forwardsFilter = (reaction, user) => reaction.emoji.name === '▶';
                let backwards = msg.createReactionCollector(backwardsFilter, {time: 100000}),
                    forwards = msg.createReactionCollector(forwardsFilter, {time: 100000});

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
                    msg.edit(embed);

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
                    msg.edit(embed);

                    reaction.fetchUsers().then(users => {
                        let reactedUsers = users.filter(user => user.username !== '붕어');

                        reactedUsers.forEach(reactedUser => {
                            reaction.remove(reactedUser);
                        });
                    });
                });
            });
        });
    }
};

Array.prototype.chunk = function(chunkSize) {
    let R = [];
    let len = this.length;

    for (let i = 0; i < len; i += chunkSize) {
        R.push(this.slice(i, i + chunkSize));
    }

    return R;
};

Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)];
};

Array.prototype.shuffle = function() {
    let len = this.length;

    for (let i = len - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [this[i], this[j]] = [this[j], this[i]];
    }

    return this;
};

String.prototype.format = function() {
    let a = this;

    for (let k in arguments) {
        a = a.replace('{' + k + '}', arguments[k]);
    }

    return a;
};