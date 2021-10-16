const loginRouter = require('express').Router()
const db = require("./db")

const sql = {}

sql.fetchAllitem = result => {
    db.query("select * from Items order by item_id desc", (err, res) => {
        if (err) {
            console.log(err)
            result(err, null)
            return
        }
        console.log("fetch all item")
        result(null, res)
    })
}
sql.fetchAllUsers = result => {
    db.query("select * from Users", (err, res) => {
        if (err) {
            console.log(err)
            result(err, null)
            return
        }
        console.log("fetch all users")
        result(null, res)
    })
}
sql.fetchUserById = (id, result) => {
    db.query(`select * from Users where user_account = ${id}`, (err, res) => {
        if (err) {
            console.log(err)
            result(err, null)
            return
        }
        console.log("fetch ", id)
        result(null, res)
    })
}
sql.fetchItemsById = (id, result) => {
    db.query(`select * from Items where user_account = ${id}`, (err, res) => {
        if (err) {
            console.log(err)
            result(err, null)
            return
        }
        console.log("fetch ", id, "'s items")
        result(null, res)
    })
}
module.exports = sql