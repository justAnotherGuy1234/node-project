import { Queue } from "bullmq";
import { createNewRedisConnection } from "../config/redisConfig";

export const submissionQueue = new Queue("submission" , {
    connection : createNewRedisConnection(),
    defaultJobOptions : {
        attempts : 3 ,
        backoff : {
            type : "exponential",
            delay : 2000
        }
    }
})

submissionQueue.on("error" , (error)=>{
    console.log("error creating submission queue" , error)
})

submissionQueue.on("waiting" , (job)=>{
    console.log("submission job waiting " , job.id)
})