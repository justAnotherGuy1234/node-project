import { PrismaClient } from "@prisma/client";
import { problemDto } from "../dto/problemDto";

const prisma = new PrismaClient()

export interface IProblemRepo {
    createProblem(problem : problemDto ) : Promise<any>
    getProblemById(problemId : number) : Promise<any>
}


export class ProblemRepo implements IProblemRepo {
    
    async createProblem(problem: problemDto): Promise<any> {
        const newProblem = await prisma.problem.create({
            data: {
                title: problem.title,
                description: problem.description,
                difficulty: problem.difficulty,
                testCase: {
                    create: problem.testCase.map((test) => ({
                        input: test.input,
                        output: test.output
                    }))
                }
            },
            include: {
                testCase: true
            }
        })
        
        return newProblem; 
    }

    async getProblemById(problemId : number): Promise<any> {
        const problem = await prisma.problem.findUnique({where : {id : problemId} , include : {testCase : true}})

        if (!problem){
            throw new Error("failed to get problem with given id ")
        }

        return problem
    }
}
