import { PrismaClient } from "@prisma/client";
import { problemDto } from "../dto/problemDto";

const prisma = new PrismaClient()

export interface IProblemRepo {
    createProblem(problem : problemDto ) : Promise<any>
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
}
