const { Collection } = require('discord.js');
const path = require('path');
const glob = require('fast-glob');

class Store extends Collection {
    constructor(client, name) {
        super();

        this.client = client;
        this.name = name;
        this.dir = `${path.dirname(require.main.filename)}${path.sep}${name}`;
    }

    set(flake) {
        let { name } = flake;

        if (this.has(name)) {
            this.delete(name);
        }

        super.set(name, flake);

        return flake;
    }

    delete(name) {
        if (!this.has(name)) {
            return false;
        }

        return super.delete(name);
    }

    load(file) {
        let filePath = path.join(this.dir, file);

        try {
            let flake = this.set(new (require(filePath))(this.client, file));

            this.client.logger.log(`${this.name}${path.sep}${file} loaded`);

            return flake;
        } catch (e) {
            this.client.logger.error(`Failed to load ${this.name.slice(0, -1)} (${filePath})\n${e.stack || e}`);

            return null;
        }
    }

    async loadFiles() {
        this.clear();
        await this.walkFiles();

        return this.size;
    }

    async walkFiles() {
        let files = await glob('**.js', { cwd: this.dir });

        return Promise.all(files.map(file => this.load(file)));
    }
}

module.exports = Store;
