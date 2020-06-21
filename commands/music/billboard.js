const Command = require('../../structures/Command.js');
const request = require('request');
const cheerio = require('cheerio');
const moment = require('moment');

class Billboard extends Command {
    constructor(file) {
        super(file);
    }

    async run(message) {
        request.get(bot.const.BILLBOARD_CHART_URL, (err, res, body) => {
            let $ = cheerio.load(body);

            let chart = [];
            let titles = $('.chart-element__information__song').map(function() {
                return $(this).text();
            }).get();
            let artists = $('.chart-element__information__artist').map(function() {
                return $(this).text();
            }).get();

            for (let i = 0; i < 100; i++) {
                chart.push(`\` ${i + 1}. ${artists[i]} - ${titles[i]} \``);
            }

            let chart_chunks = chart.chunk(20).map(chunk => chunk.join('\n'));
            let today = moment().format('YYYYMMDD');
            let embedOptions = {
                title: `:musical_note: **billboard_chart_${today}**`,
                color: 0x00aaa9
            };

            bot.tools.page(message, chart_chunks, embedOptions);
        });
    }
}

module.exports = Billboard;
