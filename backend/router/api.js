//include all get methods for all users 
const apiRouter = require('express').Router()
const sql = require("../model/common_model")
const db = require("../db")

apiRouter.get('/', (request, response) => {
    const note = {
        name: "vielo",
        time: "NO time to fly"
    }
    console.log("Hi, viewers!", note)
    response.json(note)

})
apiRouter.get('/items', (res, req) => {
    sql.fetchAllitem((err, data) => {
        if (err) throw err
        req.json(data)
    })
})
apiRouter.get('/users', (res, req) => {
    sql.fetchAllUsers((err, data) => {
        if (err) throw err
        req.json(data)
    })
})
apiRouter.get('/user', (res, req) => {
    sql.fetchUserById(res.body.user_account, (err, data) => {
        if (err) throw err
        req.json(data)
    })
})
apiRouter.get('/item', (res, req) => {
    sql.fetchItemById(res.body.item_id, (err, data) => {
        if (err) throw err
        req.json(data)
    })
})
apiRouter.get('/UserItems', (res, req) => {
    sql.fetchItemByUser(res.body.user_account, (err, data) => {
        if (err) throw err
        req.json(data)
    })
})
module.exports = apiRouter