import express from "express"
import { createRoomController, getRoomByCategoryController } from "../controller/roomController"

const router = express.Router()

router.post("/create" , createRoomController)
router.get("/category" , getRoomByCategoryController)


export default router