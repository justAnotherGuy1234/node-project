import express from "express"
import { confirmBookingController, createBookingController } from "../controller/bookingController"

const router = express.Router()

router.post("/create" , createBookingController)
router.post("/confirm" , confirmBookingController)

export default router