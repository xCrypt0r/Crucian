class Command {
    constructor(file, options = {}) {
        this.name = options.name || file.name;
        this.description = options.description || 'No description provided';
        this.usage = options.usage || 'No usage provided';
        this.aliases = options.aliases || [];
        this.cooltime = options.cooltime || 0;
        this.isOwnerOnly = options.isOwnerOnly;
        this.file = file;
    }
}

module.exports = Command;