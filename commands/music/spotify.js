const Command = require('../../interfaces/Command.js');
const request = require('request');
const cheerio = require('cheerio');
const moment = require('moment');

class Spotify extends Command {
    constructor(file) {
        super(file);
    }

    async run(message) {
        let url = 'https://spotifycharts.com/regional';

        request.get(url, (err, res, body) => {
            let $ = cheerio.load(body);

            let chart = [];
            let rgx = /^by /;
            let titles = $('.chart-table-track strong').map(function() {
                return $(this).text();
            }).get();
            let artists = $('.chart-table-track span').map(function() {
                return $(this).text().replace(rgx, '');
            }).get();
            let streams = $('.chart-table-streams').slice(1).map(function() {
                return $(this).text();
            }).get();

            for (let i = 0; i < 200; i++) {
                chart.push(`\` ${i + 1}. ${artists[i]} - ${titles[i]} (${streams[i]})\``);
            }

            let chart_chunks = chart.chunk(20).map(chunk => chunk.join('\n'));
            let today = moment().format('YYYYMMDD');
            let embedOptions = {
                title: `:musical_note: **spotify_chart_${today}**`,
                color: 0x1ed761
            };

            bot.tools.page(message, chart_chunks, embedOptions);
        });
    }
}

module.exports = Spotify;
