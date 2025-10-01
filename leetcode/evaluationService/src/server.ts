import express from "express"
import { startWorker } from "./worker/evaluation.worker"
import { pullAllImages, pullImage } from "./util/container/pullingImage"
import { createContainer } from "./util/container/createContainer"
import { CPP_IMAGE, PYTHON_IMAGE } from "./util/contants"
import { Container } from "dockerode"
import { runCode } from "./util/container/runCode"

const app = express()

app.use(express.json())


app.listen(8000, async () => {
    console.log("server started at port", 8000)
    await startWorker()

    console.log("worker started successfully in evaluation service")

    //await pullAllImages()

    //console.log("image pulled successfully")

    //await testCode()
    //await testCppCode()
})

// async function testCode() {
//     const code = `
// print("hello")
// print("bye")
//     `
//     await runCode({
//         code : code,
//         timeLimit : 3000,
//         language : "PYTHON",
//         imageName : PYTHON_IMAGE,
//         input : "6"
//     })
// }

// async function testCppCode(){
//     const code = `
// #include<iostream>

// int main(){
//     std::cout<<"hello world";
//     return 0;
// }
//     `

//     await runCode({
//         code : code,
//         language : "CPP",
//         timeLimit : 1000,
//         imageName : CPP_IMAGE,
//         input : "8"
//     })
// }