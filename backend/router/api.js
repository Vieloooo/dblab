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
apiRouter.get('/items', (req, res) => {
    sql.fetchAllitem((err, data) => {
        if (err) throw err
        console.log(data)
        res.json(data)
    })
})
apiRouter.get('/users', (req, res) => {
    sql.fetchAllUsers((err, data) => {
        if (err) throw err
        res.json(data)
    })
})
apiRouter.post('/user', (req, res) => {
    console.log(req.body.user_account)

    sql.fetchUserById(req.body.user_account, (err, data) => {
        if (err) throw err

        res.json(data)
    })
})
apiRouter.post('/item', (req, res) => {
    console.log(req.body.item_id)
    sql.fetchItemById(req.body.item_id, (err, data) => {
        if (err) throw err
        res.json(data)
    })
})
apiRouter.post('/userItems', (req, res) => {
    sql.fetchItemByUser(req.body.user_account, (err, data) => {
        if (err) throw err
        res.json(data)
    })
})
module.exports = apiRouter