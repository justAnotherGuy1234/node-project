export type problemDto = {
    title : string
    description : string 
    difficulty : "easy" | "medium" | "hard"
    testCase : {
        input : string
        output : string 
    }[]
}