import express from "express"
import { ProtectedRoute } from "../protectedRoutes"
import { CreateBlogController } from "../controller/blogController"

const router = express.Router()

router.post("/create" , ProtectedRoute , CreateBlogController)

export default router