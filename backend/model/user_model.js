
const db = require("../db")
const sql = require('./common_model')

const user = {}

user.updateInfo = (userInfo, result) => {
    db.query(`update Users Set user_name = "${userInfo.user_name}",addr_zip = ${userInfo.addr_zip}, user_detail_addr = "${userInfo.user_detail_addr}", passwd = "${userInfo.passwd}" where user_account = ${userInfo.user_account}`,
        (err, data) => {
            console.log(err, data)
            if (err) {
                result(err)
            } else {
                result(null)
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
    db.query(`select * from Profits where id = ${id}`,
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
    db.query(`select * from Transactions , Items where Transactions.user_account = ${id} and Items.item_id = Transactions.item_id order by tx_stamp desc`,
        (err, data) => {
            console.log(err, data)
            if (err) {
                result(err, null)
            } else {
                result(null, data)
            }
        })
}
user.getTxsNeedShip = (id, result) => {
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
user.ConfirmTx = (tx_id, result) => {
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
                result(err)
            } else {
                result(null)
            }
        })
}
user.DelOnChart = (userid, itemid, result) => {
    db.query(`delete from Charts where user_account = ${userid} and item_id = ${itemid}`,
        (err, data) => {
            console.log(err, data)
            if (err) {
                result(err)
            } else {
                result(null)
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
        userid,balance, item_id , item_price , provider id 
    }
    */
    //new tx
    sql.getMaxTxId((err, res) => {
        if (err) {
            result(err, null)
            return
        }
        db.query(`insert into Transactions values ( ${res} , ${input.item_id} ,${input.user_account} , ${input.provider_id} , NOW(), ${input.gas}  , 0)`,
            (err, data) => {
                if (err) {
                    console.log(err)
                    result(err, null)
                } else {
                    user.updateBalance(input.user_account, (input.balance - input.item_price - input.gas), (err) => {
                        if (err) {
                            result(err, null)
                        }
                        result(null, data[0])
                    })
                }


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
        })
}

user.getAllMsg = (from, result) => {
    db.query(`select * from Msgs where user_account = ${from}  or send_to = ${from} order by Msg_stamp desc`,
        (err, data) => {
            if (err) {
                result(err, null)
                return
            }
            result(null, data)
        })
}
user.msgFromMe = (from, result) => {
    db.query(`select * from Msgs where user_account = ${from} order by Msg_stamp desc`,
        (err, data) => {
            if (err) {
                result(err, null)
                return
            }
            result(null, data)
        })
}

user.sendMsg = (id, msg, to, result) => {
    db.query("select count(*) as num from Msgs", (err1, data1) => {
        if (err1) throw err1
        db.query(`insert into Msgs values ( ${data1[0].num}, ${id}, "${msg}", ${to} , NOW())`,
            (err, data) => {
                if (err) {
                    result(err)
                    return
                }
                result(null)
            })
    })

}

module.exports = user