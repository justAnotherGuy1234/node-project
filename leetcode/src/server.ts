import express from "express"
import userRoute from "./route/v0/userRoute"
import problemRoute from "./route/v0/problemRoute"

const app = express()
app.use(express.json())

const port = 5000

app.use("/api/v0/user" , userRoute)
app.use("/api/v0/problem" , problemRoute)


app.listen(port , () => {
    console.log("server runing on port : " , port)
})