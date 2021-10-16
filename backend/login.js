const loginRouter = require('express').Router()
const db = require("./db")

//post: user_account int64, user_passwd 26 char 
//  query db, if user_account in db, 
//res: user_info, top 20 items or error code 1, no user 

//post: passwd
// add a new user in users, 
//res: user_info, top 20items 
module.exports = loginRouter