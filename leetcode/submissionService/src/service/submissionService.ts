import { getProblemByIdApi } from "../api/problemServiceApi";
import { createSubmissionDto } from "../dto/submissionDto";
import { SubmissionProducer } from "../producer/submissionProducer";
import { ISubmissionRepo } from "../repo/submissionRepo";

export interface ISubmissionService {
    createSubmissionService(data : createSubmissionDto) :Promise<any>

    //todo
    //findByIdService(data : SubmissionId)
    //findByProblemIdService(data : ProblemId)
    //deleteByIdService(data : SubmissionId)
}

export class SubmissionService implements ISubmissionService {
    
    private submissionRepo : ISubmissionRepo

    constructor(submissionRepo : ISubmissionRepo){
        this.submissionRepo = submissionRepo ;
    }

    async createSubmissionService(data: createSubmissionDto): Promise<any> {
       //TODO
       //have to add extra logic of evaluation service and send the submission payload to the queue 
        if(!data.problemId || !data.code || !data.language){
            throw new Error("problem id , code , language  is mandatory")
        }
       
        const problem = await getProblemByIdApi(data.problemId)

        if(!problem){
            throw new Error("failed to get problem by id")
        }

       const submission = await this.submissionRepo.createSubmissionRepo(data)

       if(!submission){
        throw new Error("failed to create new submission ")
       }

       const jobId = await SubmissionProducer({
        submissionId : submission.id,
        problem : problem,
        code : submission.code,
        language : submission.language
       })

       // store job id in submission db 

       return submission
    }
}