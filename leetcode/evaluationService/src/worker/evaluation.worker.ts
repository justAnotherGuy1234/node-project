import { Worker , Job } from "bullmq";
import { SUBMISSION_QUEUE } from "../util/contants";
import { createNewRedisConnection } from "../config/redisConfig";

async function setupEvaluationWorker(){
    const worker = new Worker(SUBMISSION_QUEUE , async(job : Job) => {
        console.log("processing job" , job.id)
    }, {
        connection : createNewRedisConnection()
    })

    worker.on("error" , (error)=>{
        console.log("error in creating worker" , error)
    })

    worker.on("failed" , (job , error)=>{
        console.log("failed to complete job" , job , error) 
    })
    
    worker.on("completed" , (job)=>{
        console.log("completed job" , job.id )
    })
}

export async function startWorker(){
    await setupEvaluationWorker()
}