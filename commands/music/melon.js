const Command = require('../../structures/Command.js');
const request = require('request');
const cheerio = require('cheerio');

class Melon extends Command {
    constructor(file) {
        super(file);
    }

    async run(message) {
        let instance = this;

        request.get({
            url: bot.const.MELON_CHART_URL,
            headers: bot.const.MELON_HEADERS
        }, (err, res, body) => {
            let $ = cheerio.load(body);

            let chart = [];
            let titles = $('.rank01').children('span').children('a').map(function() {
                return instance.escapeMarkdown($(this).text());
            }).get();
            let artists = $('.rank02').children('span').map(function() {
                return instance.escapeMarkdown($(this).text());
            }).get();

            for (let i = 0; i < 100; i++) {
                chart.push(bot.const.MELON_CHART_FORMAT.format(i + 1, artists[i], titles[i]));
            }

            let chart_chunks = chart.chunk(20).map(chunk => chunk.join('\n'));
            let today = new Date().toJSON().slice(0, 10).replace(/-/g, '');
            let embedOptions = {
                title: bot.lang.melonChartTitle.format(today)
            };

            bot.tools.page(message, chart_chunks, embedOptions);
        });
    }

    escapeMarkdown(text) {
        let unescaped = text.replace(/\\(\*|_|`|~|\\)/g, '');
        let escaped = unescaped.replace(/(\*|_|`|~|\\)/g, '');
    
        return escaped;
    }
}

module.exports = Melon;
