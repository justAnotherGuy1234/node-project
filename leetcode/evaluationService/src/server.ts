import express from "express"
import { startWorker } from "./worker/evaluation.worker"

const app = express()

app.use(express.json())


app.listen(8000 , async () => {
    console.log("server started at port" , 8000 )
    await startWorker()
    console.log("worker started successfully in evaluation service")
})