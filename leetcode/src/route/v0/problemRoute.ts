import express from "express"
import { createProblemController } from "../../controller/problemController"

const router = express.Router()

router.post("/create" , createProblemController)

export default router