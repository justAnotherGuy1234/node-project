import express from "express"
import problemRouter from "./route/problemRoute"

const app = express()

app.use(express.json())


app.use("/api/v0/problem" , problemRouter)

app.listen(5000, () => {
    console.log("server started at port")
})