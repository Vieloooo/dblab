const userRouter = require('express').Router()
const user = require("../model/user_model")
const common = require("../model/common_model")
const db = require("../db")
const { use } = require('./api')
const con = require('../db')

//me
userRouter.post('/updateInfo', (req, res) => {
    console.log(req.body)
    user.updateInfo(req.body, err => {
        if (err) {
            res.json({
                state: 0
            })
        }
        res.json({
            state: 1
        })
    })
})

userRouter.post('/getMyProfit', (req, res) => {
    user.getMyprofit(req.body.user_account, (err, data) => {
        if (err) {
            console.log(err)
            res.json({
                state: 0,
                profit: 0
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
userRouter.post('/getMyTxs', (req, res) => {
    user.getMyTxs(req.body.user_account, (err, data) => {
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
userRouter.post("/myChart", (req, res) => {
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
    console.log(req.body)
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
            console.log(err)
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

userRouter.post("/getAllMsg", (req, res) => {
    user.getAllMsg(req.body.user_account, (err, data) => {
        if (err) {
            console.log(err)
            res.json({
                state: 0,
                msgs: data
            })
        } else {
            res.json({
                state: 1,
                msgs: data
            })
        }
    })
})
userRouter.post("/getMsgFromMe", (req, res) => {
    user.msgFromMe(req.body.user_account, (err, data) => {
        if (err) {
            console.log(err)
            res.json({
                state: 0,
                msgs: data
            })
        } else {
            res.json({
                state: 1,
                msgs: data
            })
        }
    })
})


userRouter.post("/ConfirmTx", (req, res) => {
    console.log(req.body)
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
userRouter.post("/mySell", (req, res) => {
    db.query(`select * from Transactions , Items where Transactions.item_id = Items.item_id and Items.user_account = ${req.body.user_account} order by Transactions.tx_state `, (err, data) => {
        if (err) {
            console.log(err)
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
userRouter.post("/postItem", (req, res) => {
    const item = req.body
    db.query("select max(item_id) as num from Items", (err1, data1) => {
        if (err1) throw err1
        db.query(`insert into Items values ( ${data1[0].num + 1}, "${item.item_name}", ${item.type_id}, ${item.user_account} ,"${item.item_info} " , ${item.item_price})`,
            (err, data) => {
                if (err) {
                    console.log(err)
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
})
userRouter.post("/delItem", (req, res) => {
    const id = req.body.item_id
    db.query(`delete from Items where item_id = ${id} `,
        (err, data) => {
            console.log(err, data)
            if (err) {
                res.json({ "state": 0 })
            } else {
                res.json({ "state": 1 })
            }
        })

})
module.exports = userRouter