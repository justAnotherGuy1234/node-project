import express from "express"

const router = express.Router()

router.post("/booking" , getPassengerBookingController)

router.post("/feedback" , feedBackForRideController)