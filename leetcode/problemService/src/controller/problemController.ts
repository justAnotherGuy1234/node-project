import { Request, Response } from "express"
import { IProblemService, ProblemService } from "../service/problemService"
import { createProblemSchema } from "../validator/problemValidator"
import { ProblemRepo } from "../repo/problemRepo"



const problemRepo = new ProblemRepo()
const problemService = new ProblemService(problemRepo)

export const ProblemController = {

    async createProblem(req: Request, res: Response) {
        try {

            const validator = createProblemSchema.safeParse(req.body)

            if (!validator.success) {
                return res.status(500).json({
                    msg: "incorrect input ",
                    error: validator.error
                })
            }

            const problem = await problemService.createProblemService(validator.data)

            if(!problem){
                return res.json("failed to create problem")
            }

            return res.json({
                msg : "created problem",
                data : problem
            })
        } catch (e) {
            console.log("error in create problem", e)
            return res.status(500).json({
                msg: "Internal server error"
            })
        }
    },

    async getProblemById(req : Request , res : Response){
        const Id = req.params.id
        const problemId = parseInt(Id)
        const problem = await problemService.getProblemByIdService(problemId)

        if(!problem){
            return res.json("failed to get problem with given id")
        }

        return res.json({
            "msg" : "got problem with id",
            "data" : problem
        })
    }
}