require('dotenv').config();
require('./lib/prototypes.js');

const Crucian = require('./interfaces/Crucian.js');
const bot = global.bot = new Crucian();

bot.login(process.env.TOKEN);

process.on('unhandledRejection', bot.logger.error);

process.on('uncaughtException', err => {
    bot.logger.error(err);
    process.exit(1);
});