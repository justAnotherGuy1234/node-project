import { PYTHON_IMAGE } from "../contants";
import { commands } from "./commandsUtil";
import { createContainer } from "./createContainer";


interface RunCodeOptions  {
    code : string,
    language : "python" | "cpp",
    timeLimit : number,
    imageName : string
}


export async function runCode(options : RunCodeOptions){

    //in linux we can push code in a file with this operator --  echo "Hello world" > test.py
    
    const container = await createContainer({
        imageName : options.imageName ,
        cmdExecutable : commands[options.language](options.code),
        memoryLimit : 1024 * 1024 * 1024
    })

    const timeLimitExeded = setTimeout(async ()=>{
        console.log("time limit exceded")
        await container?.kill()
    } , options.timeLimit)

    await container?.start()

    console.log("container started")

    const status = await container?.wait()

    console.log("container status"  , status)

    const logs = await container?.logs({
        stdout : true ,
        stderr : true
    })

    console.log("logs " , logs?.toString())

    await container?.remove()

    if(status.StatusCode == 0){
        clearTimeout(timeLimitExeded)
        console.log("container exited successfully")
    }else {
        clearTimeout(timeLimitExeded)
        console.log("error during runinng code ")
    }

}