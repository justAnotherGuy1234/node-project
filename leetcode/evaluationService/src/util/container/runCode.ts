import { PYTHON_IMAGE } from "../contants";
import { commands } from "./commandsUtil";
import { createContainer } from "./createContainer";


interface RunCodeOptions  {
    code : string,
    language : "PYTHON" | "CPP" 
    timeLimit : number,
    imageName : string,
    input : string 
}


export async function runCode(options : RunCodeOptions){

    //in linux we can push code in a file with this operator --  echo "Hello world" > test.py
    
    const container = await createContainer({
        imageName : options.imageName ,
        cmdExecutable : commands[options.language](options.code , options.input),
        memoryLimit : 1024 * 1024 * 1024
    })

    let isTimeLimitExceed : boolean = false

    const timeLimitExeded = setTimeout( ()=>{
        console.log("time_limit_exceded")
        isTimeLimitExceed = true
        container?.kill()
    } , options.timeLimit)

    await container?.start()

    console.log("container started")

    const status = await container?.wait()

    console.log("container status"  , status)

    if(isTimeLimitExceed){
        await container?.remove()
        return {
            "status" : "time_limit_exceeded",
            "output" : "time limit exceeded"
        }
    }

    const logs = await container?.logs({
        stdout : true ,
        stderr : true
    })

    const containerLogs = processLogs(logs)

    console.log("logs " , logs?.toString())

    await container?.remove()

    if(status.StatusCode == 0){
        clearTimeout(timeLimitExeded)
        console.log("container exited successfully")
        return {
            "status" : "success",
            "output" : containerLogs
        }
    }else {
        clearTimeout(timeLimitExeded)
        console.log("error during runinng code ")
        return {
            "status" : "failed",
            "output" : containerLogs
        }
    }

}

function processLogs(logs : Buffer | undefined){
    return logs?.toString('utf-8')
    .replace(/\x00/g,'') // remove all extra bytes from container logs
    .replace (/[\x00-\x09\x0B-\x1F\x7F-\x9F]/g , '')
    .trim()
}