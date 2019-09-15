const Config = require('./data/config.json');
const lang = require('./data/lang.json');
const discord = require('discord.js');
const tools = require('./lib/utils.js');
const fs = require('fs');
const bot = new discord.Client();
let cooldown = new Set();

bot.commands = new discord.Collection();

fs.readdir('./commands/', (err, files) => {
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

        handler.config.alias.forEach(al => {
            if (bot.commands.has(al)) {
                console.error(`Bot already has ${al} handler.
                    It'll override existing handler.`);
            }

            bot.commands.set(al, handler);
        });

        console.log(`Handler: ${file} loaded.`);
    });
});

bot.on('ready', async () => {
    let status = ['online', 'idle', 'dnd', 'offline'];

    console.log(`Logged in as ${bot.user.tag}`);

    bot.user.setStatus(status[2]);
});

bot.on('message', async message => {
    if (Config.IGNORE_BOT_MESSAGES && message.author.bot) {
        return;
    }

    let prefix = Config.PREFIX;

    if (message.content.startsWith(prefix)) {
        let messageArray = message.content.split(' '),
            cmd = messageArray[0].slice(prefix.length).toLowerCase(),
            args = messageArray.slice(1),
            handler = bot.commands.get(cmd),
            isOwner = message.author.id === process.env.OWNER_ID;

        if (handler) {
            if (handler.config.isOwnerOnly && !isOwner) {
                message.reply(lang.ownerOnlyCommand.format(handler.config.name.toUpperCase()));

                return;
            }

            if (cooldown.has(handler)) {
                message.reply(lang.commandInCooldown.format(handler.config.name.toUpperCase()));

                return;
            }

            handler.run(bot, message, args, tools);

            let cooltime = handler.config.cooltime;

            if (cooltime) {
                cooldown.add(handler);

                setTimeout(() => {
                    cooldown.delete(handler);
                }, cooltime);
            }
        }
    }
})

bot.login(process.env.TOKEN);