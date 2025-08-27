
import express from "express"
import { ProblemRepo } from "../repo/problemRepo"
import { ProblemService } from "../service/problemService"
import { ProblemController } from "../controller/problemController"


const router = express.Router()


router.post("/create" , ProblemController.createProblem)

export default router
