import express from "express"
import { startWorker } from "./worker/evaluation.worker"
import { pullImage } from "./util/container/pullingImage"
import { createContainer } from "./util/container/createContainer"
import { PYTHON_IMAGE } from "./util/contants"

const app = express()

app.use(express.json())


app.listen(8000 , async () => {
    console.log("server started at port" , 8000 )
    await startWorker()
    console.log("worker started successfully in evaluation service")
    await pullImage("python:3.8-slim")
    console.log("image pulled successfully")

    const container = await createContainer({
        imageName : PYTHON_IMAGE,
        cmdExecutable : ['echo' , 'hello world'],
        memoryLimit : 1024 * 1024 * 1024
    })

    await container?.start()
})