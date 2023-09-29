const express = require("express")
const taskOneRouter = require("../routes/api/taskOne")
const taskTwoRouter = require("../routes/api/taskTwo")
const taskFiveRouter = require("../routes/api/taskFive")

module.exports = function routes(app)
{
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use("/api", taskOneRouter)
    app.use("/api", taskTwoRouter)
    app.use("/api", taskFiveRouter)
}