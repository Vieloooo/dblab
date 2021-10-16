const config = require("./utils/config");
const mysql = require('mysql');

var con = mysql.createPool({
    connectionLimit: 100, //important
    host: config.mysqlHost,
    user: config.mysqlUser,
    password: config.mysqlPasswd,
    database: config.mysqlDb
});

module.exports = con;