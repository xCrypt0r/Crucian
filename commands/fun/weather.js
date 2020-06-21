const Command = require('../../structures/Command.js');
const discord = require('discord.js');
const weather = require('weather-js');

class Weather extends Command {
    constructor(file) {
        super(file);
    }

    async run(message, args) {
        if (args.length < 1) {
            message.reply(bot.lang.lackOfArguments);

            return;
        }

        weather.find({ search: args.join(' '), degreeType: 'C' }, (err, res) => {
            if (err) {
                bot.logger.error(err);

                return;
            }

            if (!res[0]) {
                message.reply(bot.lang.noWeatherResults.random());

                return;
            }

            let current = res[0].current,
                location = res[0].location,
                { weatherInformation: info } = bot.lang;
            let embed = new discord.MessageEmbed()
                .setDescription(info.skytext.format(current.skytext))
                .setAuthor(info.title.format(current.observationpoint))
                .setThumbnail(current.imageUrl)
                .setColor(0x00ae86)
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
        });
    }
}

module.exports = Weather;
