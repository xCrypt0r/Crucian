const Command = require('../../interfaces/Command.js');
const discord = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

class Botinfo extends Command {
    constructor(file) {
        super(file, {
            name: 'botinfo',
            description: 'Show bot\'s information',
            usage: 'botinfo',
            aliases: ['봇정보'],
            isOwnerOnly: false
        });
    }

    async run(bot, message) {
        let embed = new discord.RichEmbed()
            .setDescription('Bot Information')
            .setColor(0x15f153)
            .setThumbnail(bot.user.displayAvatarURL)
            .addField('Name', `${bot.user.tag}`, true)
            .addField('Uptime', moment.duration(bot.uptime).format('D [d] H [h] m [m] s [s]'), true)
            .addField('Users', bot.users.size.toLocaleString(), true)
            .addField('Servers', bot.guilds.size.toLocaleString(), true)
            .addField('Channels', bot.channels.size.toLocaleString(), true)
            .addField('Discord.js', `v${discord.version}`, true)
            .addField('Node', process.version, true);

        message.channel.send(embed);
    }
}

module.exports = Botinfo;
