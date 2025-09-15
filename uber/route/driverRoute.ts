import express from "express"

const router = express.Router()

router.post("/booking" , getDriverBookingsController)

//get driver location through socket .io 
router.post("/location" , updateLocationController)

export default router