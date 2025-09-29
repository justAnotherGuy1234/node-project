import Docker from "dockerode"
import { CPP_IMAGE, PYTHON_IMAGE } from "../contants";

export async function pullImage(image : string) {
    const docker = new Docker()

    return new Promise((res , rej)=>{
        docker.pull(image , (err : Error , stream : NodeJS.ReadableStream) => {
            if(err) return err;

            docker.modem.followProgress(stream , function onFinished(err , output){
                if(err) return rej(err);

                res(output)
            } , function onProgress(event){
                console.log("event in progress in docker util file" , event.status)
            })
        })
    })
}

export async function pullAllImages(){
    const images = [PYTHON_IMAGE  , CPP_IMAGE]

    const promises = images.map(image=>pullImage(image))

    try {
        const res = await Promise.all(promises)
        console.log("all images pulled")
    } catch (e : any) {
       console.log("error pulling all images ") 
    }

}
