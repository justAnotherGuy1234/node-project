import Docker from "dockerode"

interface CreateContainerOptions {
    imageName : string,
    memoryLimit : number,
    cmdExecutable : string[]
}

export async function createContainer(options : CreateContainerOptions){
    try {
       const docker = new Docker() 

       const container = docker.createContainer({
        Image : options.imageName,
        Cmd : options.cmdExecutable,
        AttachStdin : true,
        AttachStdout : true,
        AttachStderr : true,
        Tty : false , // pseudo terminal in docker container
        OpenStdin : true, // keep input stream open
        HostConfig : {
            Memory : options.memoryLimit,
            PidsLimit : 100,
            CpuQuota : 50000,
            CpuPeriod : 100000,
            SecurityOpt : ["no-new-privileges"],
            NetworkMode : "none" 
        }
       })

       console.log("container started successfully")
       return container
    } catch (e : any) {
        console.log("error in creating container")
        return null
    }
}