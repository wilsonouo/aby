const mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'abyweb',
    password: 'wilson',
    database: 'member',
    port: 3306
});

conn.connect(err => {
    if(err) console.log('connecting error');
    else console.log('connecting success');
});

module.exports = conn;
