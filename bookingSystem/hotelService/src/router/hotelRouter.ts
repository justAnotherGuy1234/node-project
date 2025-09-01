import express from "express"
import { createHotelController, getHotelByIdController } from "../controller/hotelController"

const router = express.Router()

router.post("/create" , createHotelController)
router.get("/:id" , getHotelByIdController)

export default router