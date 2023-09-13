const express = require("express")
const {Router} = express
const { createPerson, getPerson, updatePerson, deletePerson } = require("../../controllers/taskTwoCntrl")

const router = Router()

// route POST api/
// desc  to create a new person resource
// access public
router.post('/', createPerson)
// route GET api/
// desc  to get a person resource
// access public
router.get('/:user_id', getPerson)
// route PUT api/
// desc  to update a person resource
// access public
router.put('/:user_id', updatePerson)
// route DELETE api/
// desc  to delete a person resource
// access public
router.delete('/:user_id', deletePerson)

module.exports = router