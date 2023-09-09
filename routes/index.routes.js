const express = require("express")
const taskOneRouter = require("routes/api/taskOne")

module.exports = function routes(app)
{
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use("/api", taskOneRouter)
}