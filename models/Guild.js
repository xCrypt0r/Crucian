const { Schema, model } = require('mongoose');

const Guild = Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    prefix: {
        type: String,
        default: '>',
        trim: true
    }
});

module.exports = model('Guild', Guild, 'guilds');