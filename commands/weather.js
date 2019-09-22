const lang = require('../data/lang.json');
const discord = require('discord.js');
const weather = require('weather-js');

module.exports.run = async (bot, message, args) => {
    if (args.length < 1) {
        message.reply(lang.lackOfArguments);

        return;
    }

    weather.find({search: args.join(' '), degreeType: 'C'}, (err, res) => {
        if (err) {
            console.error(err);

            return;
        }

        if (!res[0]) {
            message.reply(lang.noWeatherResults.random());

            return;
        }

        let current = res[0].current,
            location = res[0].location;
        let embed = new discord.RichEmbed()
            .setDescription(`**${current.skytext}**`)
            .setAuthor(`${current.observationpoint}의 날씨 정보`)
            .setThumbnail(current.imageUrl)
            .setColor(0x00ae86)
            .addField('시간대', `UTC${location.timezone}`, true)
            .addField('온도 단위', location.degreetype, true)
            .addField('온도', `${current.temperature} Degrees`, true)
            .addField('체감 온도', `${current.feelslike} Degrees`, true)
            .addField('바람', current.winddisplay, true)
            .addField('습도', `${current.humidity}%`, true);

        message.channel.send(embed);
    });
};

module.exports.config = {
    name: 'weather',
    alias: ['날씨'],
    cooltime: 5000,
    description: 'Informs the current weather',
    isOwnerOnly: false
};
