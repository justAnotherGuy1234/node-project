import express from "express"
import { createBookingController } from "../controller/bookingController"

const router = express.Router()

router.post("/create" , createBookingController)

export default router