import express from "express"
import { createRoomController, getRoomByCategoryController, getRoomController } from "../controller/roomController"

const router = express.Router()

router.post("/create" , createRoomController)
router.post("/category" , getRoomByCategoryController)
router.post("/get-room" , getRoomController)
router.post("/room-booking" , getRoomController)

export default router