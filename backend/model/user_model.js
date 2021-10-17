const loginRouter = require('express').Router()
const { response } = require('express')
const db = require("../db")
const sql = require('./common_model')

const user = {}

user.updateInfo = (userInfo, result) => {
    db.query(`update Users Set user_name = "${userInfo.user_name}",addr_zip = ${userInfo.addr_zip}, user_detail_addr = "${userInfo.user_detail_addr}", passwd = "${userInfo.passwd}" where user_account = ${userInfo.user_account}`,
        (err, data) => {
            console.log(err, data)
            if (err) {
                result(err, 1)
            } else {
                result(null, 0)
            }
        })
}
user.updateBalance = (id, newBalance, result) => {
    db.query(`update Users Set  balance = ${newBalance} where user_account = ${id}`,
        (err, data) => {
            console.log(err, data)
            if (err) {
                result(err)
            } else {
                result(null)
            }
        })
}
user.getMyprofit = (id, result) => {
    db.query(`select * from Profits where user_account = ${id}`,
        (err, data) => {
            console.log(err, data)
            if (err) {
                result(err, null)
            } else {
                result(null, data[0])
            }
        })
}
user.getMyTxs = (id, result) => {
    db.query(`select * from Transactions where user_account = ${id}`,
        (err, data) => {
            console.log(err, data)
            if (err) {
                result(err, null)
            } else {
                result(null, data)
            }
        })
}
user.getMyTxsNeedShip = (id, result) => {
    db.query(`select * from Transactions where user_account = ${id} and tx_state = 0`,
        (err, data) => {
            console.log(err, data)
            if (err) {
                result(err, null)
            } else {
                result(null, data)
            }
        })
}
user.getMyTxsShipping = (id, result) => {
    db.query(`select * from Transactions where user_account = ${id} and tx_state = 1`,
        (err, data) => {
            console.log(err, data)
            if (err) {
                result(err, null)
            } else {
                result(null, data)
            }
        })
}
user.getMyTxsConfirmed = (id, result) => {
    db.query(`select * from Transactions where user_account = ${id} and tx_state = 2`,
        (err, data) => {
            console.log(err, data)
            if (err) {
                result(err, null)
            } else {
                result(null, data)
            }
        })
}
user.ShippingTx = (tx_id, result) => {
    db.query(`Update Transactions Set tx_state = 1 where tx_id = ${tx_id}`,
        (err, data) => {
            console.log(err, data)
            if (err) {
                result(err, null)
            } else {
                result(null, data)
            }
        })
}
user.ComfirmTx = (tx_id, result) => {
    db.query(`Update Transactions Set tx_state = 2 where tx_id = ${tx_id}`,
        (err, data) => {
            console.log(err, data)
            if (err) {
                result(err, null)
            } else {
                result(null, data)
            }
        })
}
user.addTochart = (userid, itemid, result) => {
    db.query(`insert into Charts values ( ${userid}, ${itemid} ,NOW() )`,
        (err, data) => {
            console.log(err, data)
            if (err) {
                result(err, 0)
            } else {
                result(null, 1)
            }
        })
}
//
user.getMyChart = (id, result) => {
    db.query(`select Charts.item_id as item_id, Items.item_name as item_name from Charts, Items  where Charts.user_account = ${id} and Charts.item_id = Items.item_id `,
        (err, data) => {
            console.log(err, data)
            if (err) {
                result(err, null)
            } else {
                result(null, data)
            }
        }
    )
}
//balance must >= price when call this function
//return new tx id 
user.NewTx = (input, result) => {
    /*input{
        userid,balance, item_id , item price , provider id 
    }
    */

    //new tx
    sql.getMaxTxId((err, res) => {
        if (err) {
            result(err, null)
            return
        }
        db.query(`insert into Tx values ( ${res} , ${input.item_id} ,${input.user_id} , ${input.provider_id} , NOW(), ${input.gas}  , 0)`,
            (err, data) => {
                if (err) {
                    result(err, null)
                    return
                }
                result(null, res)
                //update user balance and item store --

            })
    })


}
user.delMyitem = (id, result) => {
    db.query(`delete from Items where item_id = ${id}`,
        (err, data) => {
            if (err) {
                result(err)
                return
            }
            result(null)
        }
    )
}