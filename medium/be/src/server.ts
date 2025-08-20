import express from "express"
import userRoutes from "./route/userRoutes"
import cors from "cors"
import blogRoutes from "./route/blogRoute"

const app = express()
const port = 5000
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))



app.use(express.json({limit : "20mb"}))

app.use("/api/users" , userRoutes) // user routes tested
app.use("/api/blog" , blogRoutes)


app.listen(port , () => {
    console.log("server running on port : " , port)
})
