import { sanitize } from "../util/markdown";
import { problemDto } from "../dto/problemDto";
import { IProblemRepo } from "../repo/problemRepo";

export interface IProblemService {
    createProblemService(problem : problemDto) :Promise<any>
    getProblemByIdService(problemId : number) : Promise<any>
}

export class ProblemService implements IProblemService {

    private problemRepo: IProblemRepo;

    constructor (problemRepo : IProblemRepo) {
        this.problemRepo = problemRepo
        console.log("problem service called")
    }

    async createProblemService(data : problemDto){
        const sanitizedPayload = {
            ...data ,
            description : await sanitize(data.description)
        }
        console.log("sanitize payload" , sanitizedPayload)
        const problem = await this.problemRepo.createProblem(sanitizedPayload)

        if(!problem){
            console.log("error in create problem service ")
            throw new Error("failed to create problem")
        }

        return problem
    }

    async getProblemByIdService(problemId: number): Promise<any> {
        const problem = await this.problemRepo.getProblemById(problemId)

        if(!problem){
            console.log("error in get problm by id service" , problemId)
            throw new Error("failed to get problem with given id")
        }

        return problem
    }
}