import { IProblemDetails } from "../api/problemServiceApi"
import { createSubmissionDto } from "../dto/submissionDto"
import { submissionQueue } from "../queue/submissionQueue"

interface ISubmission {
    problem : IProblemDetails
    submissionId : number 
    code : string 
    language : createSubmissionDto["language"]
}


export async function SubmissionProducer(data : ISubmission ) :Promise<string | null> {
    try {
       const job = await submissionQueue.add("evaluate-submission" , data) 
        
       console.log("job added to submission queue - name of producer -- evaluate-submission " , data)

       return job.id || null
    } catch (e : any) {
        console.log("error in submission producer" , e)
        return null
    }
}