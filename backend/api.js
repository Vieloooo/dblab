const apiRouter = require('express').Router()
const db = require("./db")

apiRouter.get('/', (request, response) => {
    const note = {
        name: "vielo",
        time: "NO time to fly"
    }
    console.log("Hi, viewers!", note)
    response.json(note)

})
module.exports = apiRouter