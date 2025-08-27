import {z} from "zod"

export const createProblemSchema = z.object({
    title : z.string(),
    description : z.string(),
    difficulty : z.enum(['easy' , 'medium' , 'hard']),
    testCase : z.array(z.object({
        input : z.string(),
        output : z.string()
    }))
})
