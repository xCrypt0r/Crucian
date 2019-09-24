const Crucian = require('./interfaces/Crucian.js');
const bot = new Crucian();

bot.login(process.env.TOKEN);

process.on('unhandledRejection', console.error);

process.on('uncaughtException', err => {
    console.error(err);
    process.exit(1);
});