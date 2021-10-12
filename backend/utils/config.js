require('dotenv').config()

let PORT = 3005
let mysqlHost = "localhost"
let mysqlUser = "root"
let mysqlPasswd = "root"
let mysqlDb = "Saltfish"
module.exports = {
    PORT,
    mysqlHost,
    mysqlUser,
    mysqlPasswd
}