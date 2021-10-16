const config = require("./utils/config");
var mysql = require('mysql');

var con = mysql.createPool({
    host: config.mysqlHost,
    user: config.mysqlUser,
    password: config.mysqlPasswd,
    database: config.mysqlDb
});
module.exports = con;