const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');
const { promisify } = require('util');
const weather = promisify(require('weather-js').find);

class Weather extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message, args) {
        try {
            let res = await weather({
                search: args.join(' '),
                degreeType: 'C'
            });

            if (!res[0]) {
                message.reply(bot.lang.noWeatherResults.random());

                return;
            }

            let current = res[0].current,
                location = res[0].location,
                { weatherInformation: info } = bot.lang;
            let embed = new MessageEmbed()
                .setDescription(info.skytext.format(current.skytext))
                .setAuthor(info.title.format(current.observationpoint))
                .setThumbnail(current.imageUrl)
                .setColor(bot.consts.COLOR.WEATHER_EMBED)
                .addFields(
                    {
                        name: info.timezone.name,
                        value: info.timezone.value.format(location.timezone),
                        inline: true
                    },
                    {
                        name: info.temperature.name,
                        value: info.temperature.value.format(current.temperature, location.degreetype),
                        inline: true
                    },
                    {
                        name: info.feelslike.name,
                        value: info.feelslike.value.format(current.feelslike, location.degreetype),
                        inline: true
                    },
                    {
                        name: info.winddisplay.name,
                        value: current.winddisplay,
                        inline: true
                    },
                    {
                        name: info.humidity.name,
                        value: info.humidity.value.format(current.humidity),
                        inline: true
                    }
                );

            message.channel.send(embed);
        } catch (e) {
            bot.logger.error(e);
        }
    }
}

module.exports = Weather;
