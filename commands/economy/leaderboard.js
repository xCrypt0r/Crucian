const Command = require('../../structures/Command.js');

class Leaderboard extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message, args) {
        let guild = message.guild,
            ranks = bot.info
                .findAll('guild', guild.id)
                .sort((a, b) => b.money - a.money);

        let leaderboard = [],
            i = 0;

        ranks.forEach(rank => {
            let member = guild.members.cache.get(rank.id);

            leaderboard.push(bot.consts.FORMAT.LEADERBOARD_CHART.format(++i, member.user.tag, rank.money));
        });

        let leaderboardChunks = leaderboard
            .chunk(10)
            .map(chunk => chunk.join('\n'));
        let embedOptions = {
            title: bot.lang.leaderboardTitle,
            color: bot.consts.COLOR.LEADERBOARD_EMBED
        };

        bot.tools.page(message, leaderboardChunks, embedOptions);
    }
}

module.exports = Leaderboard;
