import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv"

dotenv.config()

interface Input {
    submissionId : number,
    status : "PENDING" | "ACCEPTED" | "RUNNING" | "WRONG_ANSWER"
}

export async  function updateSubmissionStatusApi(data : Input):Promise<any>{
    try {
      const resposne : AxiosResponse = await axios.patch(`${process.env.SUBMISSION_SERVICE}/${data.submissionId}/status` , {status : data.status})

      if(resposne.status !== 200){
        throw new Error("failed to update submission status")
      }

      return resposne.data.data
    } catch (e : any) {
       console.log("error in get update submision api call" , e) 
        return null
    }
}