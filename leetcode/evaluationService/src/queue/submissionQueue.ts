import { Queue } from "bullmq";
import { createNewRedisConnection } from "../config/redisConfig";
import { SUBMISSION_QUEUE } from "../util/contants";

export const submissionQueue = new Queue(SUBMISSION_QUEUE , {
    connection : createNewRedisConnection(),
    defaultJobOptions : {
        attempts : 3,
        backoff : {
            type : "exponential",
            delay : 2000
        }
    }
})

submissionQueue.on("error" , (error) => {
    console.log("error in submissionQueue in evaluation service" , error)
})

submissionQueue.on("waiting" , (job)=>{
    console.log("waiting for job in evaluation service" , job.id)
})