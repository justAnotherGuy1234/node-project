import { Worker, Job } from "bullmq";
import { SUBMISSION_QUEUE } from "../util/contants";
import { createNewRedisConnection } from "../config/redisConfig";
import { IEvaluationJob, IEvaluationResult, ITestCase } from "../interface/evaluationInterface";
import { runCode } from "../util/container/runCode";
import { languageConfig } from "../config/languageConfig";
import { updateSubmissionStatusApi } from "../api/submissionApi";

type Status = "PENDING" | "ACCEPTED" | "RUNNING" | "WRONG_ANSWER"

function outputCheck(testCase : ITestCase[] , result : IEvaluationResult[]) : Status{
    let output : string[] = []
    let finalRes : Status = "ACCEPTED"
    testCase.map((testcase , index)=>{
        if(result[index].status === "time_limit_exceeded"){
            output.push("time limit exceeded")
            finalRes = "WRONG_ANSWER"
        }else if (result[index].status === "failed"){
            output.push("wrong answer")
            finalRes = "WRONG_ANSWER"
        }else {
            if(result[index].output === testcase.output){
                output.push("correct answer")
            }else {
                output.push("wrong answer")
                finalRes = "WRONG_ANSWER"
            }
        }
    })
    return finalRes
}

async function setupEvaluationWorker() {
    const worker = new Worker(SUBMISSION_QUEUE, async (job: Job) => {
        console.log("processing job", job.id)

        const data: IEvaluationJob = job.data

        console.log("data", data)
        try {
            const testCasePromise = data.problem.testCase.map(testcase => {
                return runCode({
                    code: data.code,
                    timeLimit: languageConfig[data.language].timeout,
                    imageName: languageConfig[data.language].imageName,
                    language: data.language,
                    input: testcase.input
                })
            })

            const testCaseResult : IEvaluationResult[]  = await Promise.all(testCasePromise)

           let output = outputCheck(data.problem.testCase , testCaseResult) 
           console.log("output here" , output)

           
        //    if (output !==  "PENDING" || "ACCEPTED" || "RUNNING" || "WRONG_ANSWER"){
        //         console.log(output , "output")
        //         throw new Error ( "incorrect status" )
        //    }

            const updateSubmissionStatus = await updateSubmissionStatusApi({submissionId : data.submissionId , status : output})
           
           console.log("output" , updateSubmissionStatus)
        
        } catch (e: any) {
            console.log("error in testCase" , e)
        }
    }, {
        connection: createNewRedisConnection()
    })

    worker.on("error", (error) => {
        console.log("error in creating worker", error)
    })

    worker.on("failed", (job, error) => {
        console.log("failed to complete job", job, error)
    })

    worker.on("completed", (job) => {
        console.log("completed job", job.id)
    })
}

export async function startWorker() {
    await setupEvaluationWorker()
}