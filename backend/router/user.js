const userRouter = require('express').Router()
const user = require("../model/user_model")
const common = require("../model/common_model")
const db = require("../db")
const { use } = require('./api')

//me
userRouter.post('/updateInfo', (req, res) => {

    user.updateInfo(req.body.newinfo, err => {
        if (err) {
            res.json({
                state: 0
            })
            return
        }
        res.json({
            state: 1
        })
    })
})

userRouter.get('/getMyProfit', (req, res) => {
    user.getMyprofit(req.body.user_id, (err, data) => {
        if (err) {
            res.json({
                state: 0,
                profit: {}
            })
        } else {
            res.json({
                state: 1,
                profit: data
            })
        }
    })
})

//items 
//public get items
//item detail 

//my tx 
userRouter.get('/getMyTxs', (req, res) => {
    user.getMyTxs(req.body.user_id, (err, data) => {
        if (err) {
            res.json({
                state: 0,
                Txs: null
            })
        } else {
            res.json({
                state: 1,
                Txs: data
            })
        }
    })
})

//charts 
userRouter.get("/myChart", (req, res) => {
    user.getMyChart(req.body.user_account, (err, data) => {
        if (err) {
            res.json({
                state: 0,
                items: data
            })
        } else {
            res.json({
                state: 1,
                items: data
            })
        }
    })
})
userRouter.post("/addToChart", (req, res) => {
    user.addTochart(req.body.user_account, req.body.item_id, (err) => {
        if (err) {
            res.json({
                state: 0
            })
        } else {
            res.json({
                state: 1
            })
        }
    })
})
userRouter.post("/DelOnChart", (req, res) => {
    user.DelOnChart(req.body.user_account, req.body.item_id, (err) => {
        if (err) {
            res.json({
                state: 0
            })
        } else {
            res.json({
                state: 1
            })
        }
    })
})
//item 
userRouter.post("/buyItem", (req, res) => {
    if (req.body.balance <= req.body.item_price) {
        res.json({
            state: 0,
            Tx: null
        })
    } else {
        user.NewTx(req.body, (err, data) => {
            if (err) {
                res.json({
                    state: 0,
                    Tx: data
                })
            } else {
                res.json({
                    state: 1,
                    Tx: data
                })
            }
        })
    }

})
userRouter.post("/sendMsg", (req, res) => {
    user.sendMsg(req.body.user_account, req.body.msg_content, req.body.send_to, (err) => {
        if (err) {
            res.json({
                state: 0
            })
        } else {
            res.json({
                state: 1
            })
        }
    })
})


userRouter.post("/ConfirmTx", (req, res) => {
    user.ConfirmTx(req.body.tx_id, (err, data) => {
        if (err) {
            res.json({
                state: 0
            })
        } else {
            res.json({
                state: 1
            })
        }
    })
})
//Sell 
userRouter.post("/ShippingTx", (req, res) => {
    user.ShippingTx(req.body.tx_id, (err, data) => {
        if (err) {
            res.json({
                state: 0
            })
        } else {
            res.json({
                state: 1
            })
        }
    })
})
userRouter.get("/mySell", (req, res) => {
    db.query(`select * from Transactions , Items where Transcations.item_id = Items.item_id and Items.user_account = ${req.body.user_account}`, (err, data) => {
        if (err) {
            res.json({
                state: 0,
                items: data
            })
        } else {
            res.json({
                state: 1,
                items: data
            })
        }
    })
})
module.exports = userRouter