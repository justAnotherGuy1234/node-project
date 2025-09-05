import express from "express"
import { confirmBookingController, createBookingController, test } from "../controller/bookingController"

const router = express.Router()

router.post("/create" , createBookingController)
router.post("/confirm" , confirmBookingController)
router.get("/test" , test)

export default router