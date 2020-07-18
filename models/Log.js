const { Schema, model } = require('mongoose');

const Log = Schema({
    command: {
        type: String,
        required: true
    },
    fullId: {
        type: String,
        required: true,
        index: true
    },
    timestamp: {
        type: Number,
        default: new Date()
    }
});

module.exports = model('Log', Log, 'logs');