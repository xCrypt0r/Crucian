const Event = require('../structures/Event.js');
const { connect } = require('mongoose');

module.exports = class extends Event {
    constructor(...args) {
        super(...args);
    }

    async run() {
        let {
            MONGO_USER: user,
            MONGO_PASS: pass,
            MONGO_HOST: host,
            MONGO_PORT: port,
            MONGO_DATABASE: dababase
        } = process.env;

        pass = encodeURIComponent(pass);

        await connect(`mongodb://${user}:${pass}@${host}:${port}/${dababase}`, {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        if (this.config.USE_DASHBOARD) {
            await this.dashboard.load(this);
        }

        this.logger.log('Connected to database', `Logged in as ${this.user.tag}`);
        this.guilds.cache.forEach(guild => {
            guild.initialize();
            guild.members.cache
                .filter(member => !member.user.bot)
                .forEach(member => member.initialize());
        });
    }
};
