import express from "express";
import { submissionController } from "../controller/submissionController";

const router = express.Router()

router.post("/create" , submissionController.createSubmission)
router.patch("/:id/status" , submissionController.updateStatus)
export default router