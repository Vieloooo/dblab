const loginRouter = require('express').Router()
const db = require("../db")
const sql = require("../model/common_model")
loginRouter.get('/', (request, response) => {
    const note = {
        msg: "login api work"
    }
    console.log("Hi, viewers!", note)
    response.json(note)

})

loginRouter.post('/login', (request, response) => {
    const user = request.body
    console.log(user)
    db.query(`select * from Users where user_account = ${user.account} and passwd = "${user.passwd}" `,
        (err, dbres) => {
            console.log(err, dbres)
            if (err) {
                response.json({
                    state: 0
                })
            }
            if (dbres.length == 0) {
                response.json({
                    state: 0,
                    user: {},

                })
            } else {
                response.json({
                    state: 1,
                    user: dbres[0],

                })

            }
        })

})
//signup 
loginRouter.post('/signup', (request, response) => {
    var newUserInfo = request.body
    console.log(newUserInfo, typeof (newUserInfo))

    //search database for user.user_account, passwd 
    //search biggest user id
    db.query("select count(*) as num from Users", (err, res, fields) => {
        if (err) throw err
        console.log(res[0].num)
        newUserInfo.user_account = res[0].num
        //insert new user to db
        console.log(newUserInfo)
        db.query(`insert into Users values ( ${newUserInfo.user_account},"${newUserInfo.user_name}",${newUserInfo.addr_zip},"${newUserInfo.user_detail_addr}", "${newUserInfo.passwd}", ${newUserInfo.balance} )`,
            (err, data) => {
                if (err) {
                    console.log(err)
                    response.json({
                        state: 0
                    })
                }
                console.log("new user", res)
                //return all items 
                response.json({
                    "state": 1,
                    "id": res[0].num
                })
            })
    })


})

module.exports = loginRouter