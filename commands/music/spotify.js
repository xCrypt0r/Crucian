const Command = require('../../structures/Command.js');
const { promisify } = require('util');
const request = promisify(require('request'));
const cheerio = require('cheerio');
const moment = require('moment');

class Spotify extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message) {
        let { body } = await request(bot.consts.URL.SPOTIFY_CHART),
            $ = cheerio.load(body),
            chart = [];

        let rgx = /^by /;
        let titles = $('.chart-table-track strong').map(function() {
                return $(this).text();
            }).get(),
            artists = $('.chart-table-track span').map(function() {
                return $(this).text().replace(rgx, '');
            }).get(),
            streams = $('.chart-table-streams').slice(1).map(function() {
                return $(this).text();
            }).get();

        for (let i = 0; i < 200; i++) {
            chart.push(
                bot.consts.FORMAT.SPOTIFY_CHART.format(
                    i + 1,
                    artists[i],
                    titles[i],
                    streams[i]
                )
            );
        }

        let chartChunks = chart.chunk(20).map(chunk => chunk.join('\n')),
            today = moment().format(bot.consts.FORMAT.MUSIC_CHART_DATE),
            embedOptions = {
                title: bot.lang.spotifyChartTitle.format(today),
                color: bot.consts.COLOR.SPOTIFY_CHART
            };

        bot.tools.page(message, chartChunks, embedOptions);
    }
}

module.exports = Spotify;
