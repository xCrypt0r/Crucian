require('dotenv').config();
require('./lib/prototypes.js');
require('./extenders/Guild.js');
require('./extenders/GuildMember.js');
require('./extenders/Message.js');
require('./extenders/MessageReaction.js');

const Crucian = require('./structures/Crucian.js');
const bot = global.bot = new Crucian();

bot.login(process.env.TOKEN);

process.on('unhandledRejection', bot.logger.error);

process.on('uncaughtException', err => {
    bot.logger.error(err);
    throw new Error('Something went wrong');
});
