const express = require("express")
const {Router} = express
const { getQuery } = require("../../controllers/taskOneCntrl")

const router = Router()

// route GET api/
// desc  to get the queries
// access public
router.get('/', getQuery)

module.exports = router