
const db = require("../db")

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
        result(null, res[0])
    })
}
sql.fetchItemById = (id, result) => {
    db.query(`select * from Items where item_id = ${id} `, (err, res) => {
        if (err) {
            console.log(err)
            result(err, null)
            return
        }
        console.log("fetch item", id)
        result(null, res[0])
    })
}
sql.fetchItemByUser = (id, result) => {
    db.query(`select * from Items where user_account = ${id} `, (err, res) => {
        if (err) {
            console.log(err)
            result(err, null)
            return
        }
        console.log("fetch user's items", id)
        result(null, res)
    })
}

sql.getMaxTxId = (result) => {
    db.query(`select Count(*) as num from Transactions`, (err, res) => {
        if (err) {
            console.log(err)
            result(err, null)
            return
        }

        result(null, res[0].num)
    })
}
module.exports = sql