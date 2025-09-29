import { PYTHON_IMAGE } from "../contants";
import { createContainer } from "./createContainer";

export async function runPythonCode(code : string){

    //in linux we can push code in a file with this operator --  echo "Hello world" > test.py
    const runCmd = `echo '${code}' > code.py && python3 code.py`;
    
    const container = await createContainer({
        imageName : PYTHON_IMAGE ,
        cmdExecutable : ['/bin/bash' , '-c' , runCmd],
        memoryLimit : 1024 * 1024 * 1024
    })
    await container?.start()

    console.log("container started")

    const status = await container?.wait()

    console.log("container status"  , status)

    const logs = await container?.logs({
        stdout : true ,
        stderr : true
    })

    console.log("logs " , logs?.toString())

}