const mysql = require('mysql');
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

pool.getConnection((err, connection) => {
    if (err) {
        bot.logger.error(err);

        return;
    }

    bot.logger.log('Connected to database');
});

pool.on('error', bot.logger.error);

module.exports = pool;