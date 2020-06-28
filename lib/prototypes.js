Array.prototype.chunk = function(chunkSize) {
    let R = [];
    let len = this.length;

    for (let i = 0; i < len; i += chunkSize) {
        R.push(this.slice(i, i + chunkSize));
    }

    return R;
};

Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)];
};

Array.prototype.shuffle = function() {
    let len = this.length;

    for (let i = len - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [this[i], this[j]] = [this[j], this[i]];
    }

    return this;
};

String.prototype.format = function() {
    let a = this;

    for (let k in arguments) {
        a = a.replace('{' + k + '}', arguments[k]);
    }

    return a;
};

String.prototype.escapeMarkdown = function() {
    let unescaped = this.replace(/\\(\*|_|`|~|\\)/g, ''),
        escaped = unescaped.replace(/(\*|_|`|~|\\)/g, '');
    
    return escaped;
};
