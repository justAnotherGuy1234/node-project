import express from "express"
import submissionRouter from "./route/submissionRoute"
//todo complete submission service main file 

const app = express()

app.use(express.json())

app.use("/api/v0/submission" , submissionRouter)

app.listen(7000 , ()=>{
    console.log("submission service started at port" , 7000)
})