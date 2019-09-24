const request = require('request');
const cheerio = require('cheerio');

module.exports.run = async (bot, message) => {
    let url = 'https://www.melon.com/chart/';
    let headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36'
    };

    request.get({url: url, headers: headers}, (err, res, body) => {
        let $ = cheerio.load(body);

        let chart = [];
        let titles = $('.rank01').children('span').children('a').map(function() {
            return escapeMarkdown($(this).text());
        }).get();
        let artists = $('.rank02').children('span').map(function() {
            return escapeMarkdown($(this).text());
        }).get();

        for (let i = 0; i < 100; i++) {
            chart.push(`\` ${i + 1}. ${artists[i]} - ${titles[i]} \``);
        }

        let chart_chunks = chart.chunk(20).map(chunk => chunk.join('\n'));
        let today = new Date().toJSON().slice(0, 10).replace(/-/g, '');
        let embedOptions = {
            title: `:musical_note: **melon_chart_${today}**`
        };

        bot.tools.page(message, chart_chunks, embedOptions);
    });
};

module.exports.config = {
    name: 'melon',
    alias: ['멜론'],
    cooltime: 10000,
    description: 'Display melon Top100 chart',
    isOwnerOnly: false
};

function escapeMarkdown(text) {
    var unescaped = text.replace(/\\(\*|_|`|~|\\)/g, ''); // unescape any "backslashed" character
    var escaped = unescaped.replace(/(\*|_|`|~|\\)/g, ''); // escape *, _, `, ~, \

    return escaped;
}
