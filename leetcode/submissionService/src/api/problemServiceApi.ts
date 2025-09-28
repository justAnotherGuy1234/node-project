import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv"

dotenv.config()

export interface ITestCase {
    input : string 
    output : string 
}

export interface IProblemDetails {
    id : number
    title : string 
    description : string 
    difficulty : string 
    testCase : ITestCase[]
}

export interface ProblemResponse {
    data : IProblemDetails
    message : string 
}

export async  function getProblemByIdApi(problemId : number):Promise<IProblemDetails | null>{
    try {
      const resposne : AxiosResponse<ProblemResponse> = await axios.get(`${process.env.PROBLEM_SERVICE}/${problemId}`)
      return resposne.data.data
    } catch (e : any) {
       console.log("error in get problem by id api call" , e.message) 
        return null
    }
}