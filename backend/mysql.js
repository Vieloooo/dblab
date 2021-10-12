
var mysql = require('mysql');

var con = mysql.createPool({
    host: config.mysqlHost,
    user: config.mysqlUser,
    password: config.mysqlPasswd,

});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});