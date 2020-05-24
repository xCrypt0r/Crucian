const sqlite = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite.Database(
    path.resolve(__dirname, '../db/log.db'), 
    sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE
);

let cmd = 'CREATE TABLE IF NOT EXISTS log_commands ( \
               id INTEGER PRIMARY KEY AUTOINCREMENT, \
               server TEXT NOT NULL, \
               user TEXT NOT NULL, \
               command TEXT NOT NULL, \
               date TEXT NOT NULL \
           )';

db.run(cmd);

module.exports = db;
