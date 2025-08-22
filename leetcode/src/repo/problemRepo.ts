import { PrismaClient } from "@prisma/client"
import { createProblemDto } from "../dto/problemDto"

const prisma = new PrismaClient()
export async function createProblemRepo(data : createProblemDto) {
    try {
       const problem = await prisma.problem.findUnique({where : {question : data.question}})

       if (problem){
        throw new Error("this question already exists")
       }

       const newProblem = await prisma.problem.create({data : {
        userId : data.userId,
        question : data.question,
        difficulty : data.difficulty,
        testCases : data.testCases
       }})

        if(!newProblem){
            throw new Error("Failed to create new problem")
        }       

       return newProblem
    } catch (e) {
        console.log("error creating new problem " , e)
        throw e 
    }
}