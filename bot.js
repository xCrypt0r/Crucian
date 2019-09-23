const discord = require('discord.js');
const tools = require('./lib/utils.js');
const glob = require('glob');
const bot = new discord.Client();
const active = new Map();
const cooldown = new Set();

bot.config = require('./data/config.json');
bot.lang = require('./data/lang.json');
bot.commands = new discord.Collection();

glob('**/*.js', {cwd: 'commands'}, (err, files) => {
    if (err) {
        console.error(err);

        return;
    }

    let rgx_checkJS = /\.js$/;
    let handlers = files.filter(file => rgx_checkJS.test(file));

    if (handlers.length <= 0) {
        console.error('Cannot find command handler.');

        return;
    }

    handlers.forEach(file => {
        let handler = require(`./commands/${file}`);

        bot.commands.set(handler.config.name, handler);

        if (handler.config.alias) {
            handler.config.alias.forEach(al => {
                if (bot.commands.has(al)) {
                    console.error(`Bot already has ${al} handler.
                        It'll override existing handler.`);
                }

                bot.commands.set(al, handler);
            });
        }

        console.log(`Handler: ${file} loaded.`);
    });
});

bot.on('ready', async () => {
    console.log(`Logged in as ${bot.user.tag}`);
});

bot.on('message', async message => {
    if (bot.config.IGNORE_BOT_MESSAGES && message.author.bot) {
        return;
    }

    let prefix =  bot.config.PREFIX;

    if (message.content.startsWith(prefix)) {
        let messageArray = message.content.split(' '),
            cmd = messageArray[0].slice(prefix.length).toLowerCase(),
            args = messageArray.slice(1),
            handler = bot.commands.get(cmd),
            isOwner = message.author.id === process.env.OWNER_ID;

        if (handler) {
            if (handler.config.isOwnerOnly && !isOwner) {
                message.reply(bot.lang.ownerOnlyCommand.format(handler.config.name.toUpperCase()));

                return;
            }

            if (cooldown.has(handler)) {
                message.reply(bot.lang.commandInCooldown.format(handler.config.name.toUpperCase()));

                return;
            }

            let options = {
                active: active
            };

            handler.run(bot, message, args, tools, options);

            let cooltime = handler.config.cooltime;

            if (cooltime) {
                cooldown.add(handler);

                setTimeout(() => {
                    cooldown.delete(handler);
                }, cooltime);
            }
        }
    }
});

bot.login(process.env.TOKEN);

process.on('unhandledRejection', console.error);

process.on('uncaughtException', err => {
    console.error(err);
    process.exit(1);
});