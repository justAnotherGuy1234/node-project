import express from "express"

const router = express.Router()

router.post("/create" , createBookingController)

router.post("/confirm" , confirmBookingController)

export default router