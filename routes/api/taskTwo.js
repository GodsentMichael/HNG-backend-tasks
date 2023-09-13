const express = require("express")
const {Router} = express
const { createPerson, getPerson, updatePerson, deletePerson } = require("../../controllers/taskTwoCntrl")

const router = Router()

// route GET api/
// desc  to get a person resource
// access public
router.get('/:name', getPerson)
// route POST api/
// desc  to create a new person resource
// access public
router.post('/', createPerson)
// route PUT api/
// desc  to update a person resource
// access public
router.put('/:name', updatePerson)
// route DELETE api/
// desc  to delete a person resource
// access public
router.delete('/:name', deletePerson)

module.exports = router