import express from "express";
import { submissionController } from "../controller/submissionController";

const router = express.Router()

router.post("/create" , submissionController.createSubmission)

export default router