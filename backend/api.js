const apiRouter = require('express').Router()
const sql = require("./sql")
const db = require("./db")

apiRouter.get('/', (request, response) => {
    const note = {
        name: "vielo",
        time: "NO time to fly"
    }
    console.log("Hi, viewers!", note)
    response.json(note)

})
apiRouter.get('/items', (res, req) => {
    return sql.fetchAllitem()
})
module.exports = apiRouter