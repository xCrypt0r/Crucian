module.exports = {
    guild: {
        ignoreBotMessages: true,
        prefix: '>',
        youtubeSearchLimit: 30
    },
    member: member => {
        return {
            id: member.id,
            guild: member.guild.id,
            money: 2000,
            daily: Date.now() - 86400000,
            slot: 0,
            warnings: 0,
            reminders: []
        };
    }
};