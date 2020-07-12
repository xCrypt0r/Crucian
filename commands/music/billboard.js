const Command = require('../../structures/Command.js');
const { promisify } = require('util');
const request = promisify(require('request'));
const cheerio = require('cheerio');
const moment = require('moment');

class Billboard extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message) {
        let { body } = await request(bot.consts.URL.BILLBOARD_CHART),
            $ = cheerio.load(body),
            chart = [];

        let titles = $('.chart-element__information__song').map(function() {
                return $(this).text();
            }).get(),
            artists = $('.chart-element__information__artist').map(function() {
                return $(this).text();
            }).get();

        for (let i = 0; i < 100; i++) {
            chart.push(
                bot.consts.FORMAT.BILLBOARD_CHART.format(
                    i + 1,
                    artists[i],
                    titles[i]
                )
            );
        }

        let chartChunks = chart.chunk(20).map(chunk => chunk.join('\n')),
            today = moment().format(bot.consts.FORMAT.MUSIC_CHART_DATE),
            embedOptions = {
                title: bot.lang.billboardChartTitle.format(today),
                color: bot.consts.COLOR.BILLBOARD_CHART
            };

        bot.tools.page(message, chartChunks, embedOptions);
    }
}

module.exports = Billboard;
