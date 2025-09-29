import express from "express"
import { startWorker } from "./worker/evaluation.worker"
import { pullImage } from "./util/container/pullingImage"
import { createContainer } from "./util/container/createContainer"
import { PYTHON_IMAGE } from "./util/contants"
import { Container } from "dockerode"
import { runPythonCode } from "./util/container/runPythonCode"

const app = express()

app.use(express.json())


app.listen(8000, async () => {
    console.log("server started at port", 8000)
    await startWorker()

    console.log("worker started successfully in evaluation service")

    await pullImage("python:3.8-slim")

    console.log("image pulled successfully")

    await testCode()
})

async function testCode() {
    const code = `
print("Hello world") 
print("bye") 
    `
    await runPythonCode(code)
}