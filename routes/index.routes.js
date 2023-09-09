const express = require("express")
const tasOneRouter = require("routes/api/taskOne")

module.exports = function routes(app)
{
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use("/api", tasOneRouter)
}