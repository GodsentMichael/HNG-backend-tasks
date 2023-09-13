const z = require('zod')

const PersonSchema = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email().optional(),
    age: z.string().min(2).optional(),
    address: z.string().min(3).max(255).optional(),
    phone: z.string().min(10).max(25).optional()
}).strict()

const PersonUpdateSchema = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    age: z.string().min(2),
    address: z.string().min(3).max(255),
    phone: z.string().min(10).max(25)
}).partial().strict()

module.exports = {
    PersonSchema, PersonUpdateSchema
}