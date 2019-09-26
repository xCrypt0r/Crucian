const mysql = require('mysql');
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error(err);

        return;
    }

    console.log('Connected to database');
});

pool.on('error', console.error);

module.exports = pool;