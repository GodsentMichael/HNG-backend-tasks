const z = require('zod')

const PersonSchema = z.object({
    name: z.string().min(3).max(255),
}).strict()

const PersonUpdateSchema = z.object({
    name: z.string().min(3).max(255),
}).partial().strict()

module.exports = {
    PersonSchema, PersonUpdateSchema
}