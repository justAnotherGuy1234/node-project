import { Request, Response } from "express";
import multer from "multer";
import { createProblemService } from "../service/problemService";

interface multerRequest extends Request {
    file? : Express.Multer.File
}



export async function createProblemController(req : multerRequest , res : Response) :Promise<any> {
    try {
        
        const upload = multer({
            storage : multer.memoryStorage()
        })

        const {question , difficulty } = req.body

        if(!question || !difficulty){
            return res.status(400).json("question and difficulty is mandatory")
        }

        const testCasesFile = req.file

        if (!testCasesFile){
            return res.status(400).json("upload test case file")
        }

        const userId = req.user.id

        const problemDto = {
            userId : userId,
            question,
            difficulty,
            testCases : testCasesFile.buffer
        }

        const problem = await createProblemService(problemDto) 

        return res.json({
            "msg" : "problem created",
            "data" : problem
        })
    } catch (error) {
       console.log("error in create problem" , error) 
       return res.status(500).json(error)
    }
}