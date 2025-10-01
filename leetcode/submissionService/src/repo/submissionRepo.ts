import { PrismaClient } from "@prisma/client";
import { createSubmissionDto, updateSubmissionDto } from "../dto/submissionDto";

const prisma = new PrismaClient()

export interface ISubmissionRepo {
    createSubmissionRepo(data : createSubmissionDto ) : Promise<any>
    updateSubmissionStatusRepo(data : updateSubmissionDto) : Promise<any>
    //todo 
    //findByProblemId(data : ProblemId) 
    //findById(data : SubmissionId)
    //deleteById(data : SubmissionId)
    
}



export class SubmissionRepo implements ISubmissionRepo {
    async createSubmissionRepo(data: createSubmissionDto): Promise<any> {
        const submission = await prisma.submissionService.create({data :{
            problemId : data.problemId,
            code : data.code,
            language : data.language,
            status : data.status
        }}) 

        if (!submission){
            throw new Error("failed to create new submission")
        }
        return submission
    }

    async updateSubmissionStatusRepo(data: updateSubmissionDto ): Promise<any> {
        const submission = await prisma.submissionService.update({where : {id : data.submissionId} , data : {status : data.status} })

        if(!submission){
            throw new Error("failed to update submission status")
        }
        
        return submission
    }
}