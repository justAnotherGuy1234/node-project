//todo complete controllers for submission service
import { Request , Response } from "express"
import { SubmissionRepo } from "../repo/submissionRepo"
import { SubmissionService } from "../service/submissionService"

const submissionRepo = new SubmissionRepo()
const submissionService = new SubmissionService(submissionRepo)

export const submissionController = {
    async createSubmission(req : Request , res : Response){
        const {problemId , code , language } = req.body

        const submission = await submissionService.createSubmissionService({problemId , code , language})

        return res.json({
            "msg" : "created submission successfully",
            "data" : submission
        })
    }
}