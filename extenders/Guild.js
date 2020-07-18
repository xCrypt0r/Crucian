const { Structures } = require('discord.js');
const GuildModel = require('../models/Guild.js');

module.exports = Structures.extend('Guild', Guild => class extends Guild {
    constructor(...args) {
        super(...args);
    }

    get prefix() {
        return GuildModel
            .findOne({ id: this.id })
            .then(guild => guild.prefix);
    }

    async initialize() {
        if (!await GuildModel.findOne({ id: this.id })) {
            let newGuild = new GuildModel({ id: this.id });

            await newGuild.save();
        }
    }

    async createRole(name, options = {}) {
        if (!name) {
            bot.logger.error('No role name was given');

            return;
        }

        options.name = name;
        options.color = options.color || 0x000000;

        return this.roles
            .create({ data: options });
    }
});
