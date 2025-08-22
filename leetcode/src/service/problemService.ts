import { createProblemDto } from "../dto/problemDto";
import { createProblemRepo } from "../repo/problemRepo";

export async function createProblemService(data : createProblemDto) {
    try {
        const problem = await createProblemRepo(data)

        if(!problem){
            throw new Error("failed to create new problem")
        }

        return problem
    } catch (e) {
        console.log("error in create problem" , e)
        throw e 
    }
}