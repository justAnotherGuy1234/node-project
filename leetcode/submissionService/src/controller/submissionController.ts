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
    },

    async updateStatus(req : Request , res : Response){
        const id = parseInt(req.params.id)
        const submissionId = id
        const {status} = req.body

        const submission  = await submissionService.updateSubmissionService({submissionId , status})

        if(!submission){
            return res.status(500).json({
                "msg" : "failed to update submission status"
            })
        }

        return res.json({
            "msg" : "updated submission status successffully",
            "data" : submission
        })
    }
}