const { Schema, model } = require('mongoose');

const Member = Schema({
    fullId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    guildId: {
        type: String,
        required: true,
        index: true
    },
    money: {
        type: Number,
        default: 2000
    },
    daily: {
        type: Number,
        default: new Date() - 86400000
    },
    warnings: {
        type: Number,
        default: 0
    },
    reminders: {
        type: Array,
        default: []
    }
});

module.exports = model('Member', Member, 'members');