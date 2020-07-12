const Command = require('../../structures/Command.js');
const { promisify } = require('util');
const request = promisify(require('request'));
const cheerio = require('cheerio');

class Melon extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message) {
        let { body } = await request({
            url: bot.consts.URL.MELON_CHART,
            headers: bot.consts.HEADER.MELON
        });
        let $ = cheerio.load(body),
            chart = [];

        let titles = $('.rank01').children('span').children('a').map(function() {
                return $(this).text().escapeMarkdown();
            }).get(),
            artists = $('.rank02').children('span').map(function() {
                return $(this).text().escapeMarkdown();
            }).get();

        for (let i = 0; i < 100; i++) {
            chart.push(
                bot.consts.FORMAT.MELON_CHART.format(
                    i + 1,
                    artists[i],
                    titles[i]
                )
            );
        }

        let chartChunks = chart.chunk(20).map(chunk => chunk.join('\n')),
            today = new Date().toJSON().slice(0, 10).replace(/-/g, ''),
            embedOptions = {
                title: bot.lang.melonChartTitle.format(today)
            };

        bot.tools.page(message, chartChunks, embedOptions);
    }
}

module.exports = Melon;
