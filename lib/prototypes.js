Object.setPrototypeOf(Array.prototype, {
    chunk(size) {
        let res = [],
            len = this.length;

        for (let i = 0; i < len; i += size) {
            res.push(this.slice(i, i + size));
        }

        return res;
    },
    random() {
        return this[Math.floor(Math.random() * this.length)];
    },
    shuffle() {
        let len = this.length;

        for (let i = len - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));

            [this[i], this[j]] = [this[j], this[i]];
        }

        return this;
    }
});

Object.setPrototypeOf(String.prototype, {
    format() {
        let a = this;

        for (let k in arguments) {
            a = a.replace('{' + k + '}', arguments[k]);
        }

        return a;
    },
    escapeMarkdown() {
        let unescaped = this.replace(/\\(\*|_|`|~|\\)/g, ''),
            escaped = unescaped.replace(/(\*|_|`|~|\\)/g, '');

        return escaped;
    }
});
